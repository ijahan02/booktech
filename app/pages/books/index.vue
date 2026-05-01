<template>
  <div class="books-page">
    <div class="container">
      <div class="books-page__header">
        <h1 class="books-page__title">All Books</h1>
        <p class="books-page__subtitle">
          {{ books.total.toLocaleString() }} books available
        </p>
      </div>

      <CategoryFilter v-model="activeCategory" class="books-page__filters" />

      <div class="books-page__layout">
        <!-- Sidebar filters -->
        <aside class="books-page__sidebar">
          <div class="books-page__filter-group">
            <h3 class="books-page__filter-title">Sort by</h3>
            <select
              class="books-page__select"
              :value="books.filters.sortBy"
              aria-label="Sort books by"
              @change="(e) => books.setFilter('sortBy', (e.target as HTMLSelectElement).value as BookFilters['sortBy'])"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="rating">Top rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div class="books-page__filter-group">
            <h3 class="books-page__filter-title">Price range</h3>
            <div class="books-page__price-inputs">
              <input
                type="number"
                class="books-page__price-input"
                placeholder="Min"
                min="0"
                aria-label="Minimum price"
                @change="(e) => books.setFilter('minPrice', Number((e.target as HTMLInputElement).value) || null)"
              />
              <span class="books-page__price-sep">–</span>
              <input
                type="number"
                class="books-page__price-input"
                placeholder="Max"
                min="0"
                aria-label="Maximum price"
                @change="(e) => books.setFilter('maxPrice', Number((e.target as HTMLInputElement).value) || null)"
              />
            </div>
          </div>

          <div class="books-page__filter-group">
            <h3 class="books-page__filter-title">Min rating</h3>
            <div class="books-page__rating-options">
              <button
                v-for="r in [4, 3, 2]"
                :key="r"
                class="books-page__rating-btn"
                :class="{ 'books-page__rating-btn--active': books.filters.minRating === r }"
                @click="books.setFilter('minRating', books.filters.minRating === r ? null : r)"
              >
                {{ '★'.repeat(r) }}{{ '☆'.repeat(5 - r) }} & up
              </button>
            </div>
          </div>

          <div class="books-page__filter-group">
            <label class="books-page__checkbox-label">
              <input
                type="checkbox"
                class="books-page__checkbox"
                :checked="books.filters.inStock"
                @change="books.setFilter('inStock', !books.filters.inStock)"
              />
              In stock only
            </label>
          </div>

          <button
            class="books-page__reset-btn"
            @click="books.resetFilters(); activeCategory = null"
          >
            Reset filters
          </button>
        </aside>

        <!-- Books grid -->
        <div class="books-page__content">
          <div v-if="books.isLoading" class="books-page__grid">
            <div v-for="n in 12" :key="n" class="books-page__skeleton">
              <UiSkeleton height="200px" />
              <div class="books-page__skeleton-body">
                <UiSkeleton height="12px" width="60%" />
                <UiSkeleton height="16px" />
                <UiSkeleton height="12px" width="40%" />
              </div>
            </div>
          </div>

          <div v-else-if="books.error" class="books-page__empty">
            <p>Something went wrong. Please try again.</p>
            <UiButton variant="secondary" size="sm" @click="books.refresh()">Retry</UiButton>
          </div>

          <div v-else-if="books.books.length === 0" class="books-page__empty">
            <span aria-hidden="true">📭</span>
            <p>No books found. Try adjusting your filters.</p>
            <UiButton variant="secondary" size="sm" @click="books.resetFilters(); activeCategory = null">
              Clear filters
            </UiButton>
          </div>

          <div v-else class="books-page__grid">
            <BookCard
              v-for="book in books.books"
              :key="book.id"
              :book="book"
            />
          </div>

          <div v-if="books.totalPages > 1" class="books-page__pagination">
            <UiPagination
              :model-value="books.page"
              :total="books.totalPages"
              @update:model-value="books.goToPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BookCategory, BookFilters } from '~/types/book.types'

useSeoMeta({
  title: 'Browse Books — BookTech',
  description: 'Browse thousands of books across all categories.',
})

const books = useBooks()
const activeCategory = ref<BookCategory | null>(null)

watch(activeCategory, (val) => {
  books.setCategory(val)
})
</script>

<style lang="scss" scoped>
.books-page {
  padding-block: $space-7;

  &__header {
    margin-bottom: $space-5;
  }

  &__title {
    font-family: $font-display;
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    margin-bottom: $space-1;
  }

  &__subtitle {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__filters {
    margin-bottom: $space-6;
  }

  &__layout {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: $space-6;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__sidebar {
    display: flex;
    flex-direction: column;
    gap: $space-5;
  }

  &__filter-group {
    display: flex;
    flex-direction: column;
    gap: $space-3;
    padding-bottom: $space-5;
    border-bottom: 1px solid $color-border;
  }

  &__filter-title {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
  }

  &__select {
    padding: $space-2 $space-3;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    background: $color-surface;
    font-size: $font-size-sm;
    color: $color-text-primary;
    cursor: pointer;
    width: 100%;
  }

  &__price-inputs {
    display: flex;
    align-items: center;
    gap: $space-2;
  }

  &__price-input {
    flex: 1;
    padding: $space-2 $space-3;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    font-size: $font-size-sm;
    width: 0;
  }

  &__price-sep {
    color: $color-text-muted;
    flex-shrink: 0;
  }

  &__rating-options {
    display: flex;
    flex-direction: column;
    gap: $space-2;
  }

  &__rating-btn {
    padding: $space-2 $space-3;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    background: $color-surface;
    font-size: $font-size-xs;
    color: $color-text-secondary;
    cursor: pointer;
    text-align: left;
    transition: all $transition-base;

    &:hover { border-color: $color-warning; color: $color-text-primary; }

    &--active {
      background-color: #FFF8EC;
      border-color: $color-warning;
      color: $color-text-primary;
    }
  }

  &__checkbox-label {
    display: flex;
    align-items: center;
    gap: $space-2;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    cursor: pointer;
  }

  &__checkbox {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  &__reset-btn {
    font-size: $font-size-sm;
    color: $color-text-muted;
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
    padding: 0;
    transition: color $transition-base;

    &:hover { color: $color-text-primary; }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $space-4;

    @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 480px)  { grid-template-columns: 1fr; }
  }

  &__skeleton {
    border-radius: $radius-lg;
    overflow: hidden;
  }

  &__skeleton-body {
    padding: $space-4;
    background: $color-surface;
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: $space-9;
    color: $color-text-secondary;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-4;
    font-size: $font-size-2xl;
  }

  &__pagination {
    margin-top: $space-7;
    display: flex;
    justify-content: center;
  }
}
</style>
