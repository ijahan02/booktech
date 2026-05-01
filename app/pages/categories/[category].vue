<template>
  <div class="category-page">
    <!-- Hero banner -->
    <div
      v-if="catMeta"
      class="category-page__hero"
      :style="{ background: catMeta.colors.dark }"
    >
      <div class="container">
        <span class="category-page__hero-icon" aria-hidden="true">{{ catMeta.icon }}</span>
        <h1 class="category-page__hero-title">{{ catMeta.label }}</h1>
        <p class="category-page__hero-desc">{{ catMeta.description }}</p>
      </div>
    </div>

    <div class="container">
      <div class="category-page__layout">
        <aside class="category-page__sidebar">
          <div class="category-page__filter-group">
            <h3 class="category-page__filter-label">Sort</h3>
            <select
              class="category-page__select"
              :value="books.filters.sortBy"
              @change="(e) => books.setFilter('sortBy', (e.target as HTMLSelectElement).value as any)"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="rating">Top rated</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
            </select>
          </div>
          <div class="category-page__filter-group">
            <label class="category-page__checkbox-label">
              <input
                type="checkbox"
                :checked="books.filters.inStock"
                @change="books.setFilter('inStock', !books.filters.inStock)"
              />
              In stock only
            </label>
          </div>
        </aside>

        <div class="category-page__content">
          <p class="category-page__count">
            {{ books.total.toLocaleString() }} books
          </p>

          <div v-if="books.isLoading" class="category-page__grid">
            <div v-for="n in 9" :key="n" class="category-page__skeleton">
              <UiSkeleton height="180px" />
              <div style="padding: 16px; background: white; display: flex; flex-direction: column; gap: 8px;">
                <UiSkeleton height="12px" width="60%" />
                <UiSkeleton height="16px" />
              </div>
            </div>
          </div>

          <div v-else class="category-page__grid">
            <BookCard
              v-for="book in books.books"
              :key="book.id"
              :book="book"
            />
          </div>

          <div v-if="books.totalPages > 1" class="category-page__pagination">
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
import type { BookCategory } from '~/types/book.types'

const route = useRoute()
const categorySlug = computed<BookCategory>(() => route.params.category as BookCategory)

const categories = useCategories()
const catMeta = computed(() => {
  try { return categories.getMeta(categorySlug.value) } catch { return null }
})

const books = useBooks()

onMounted(() => {
  books.setCategory(categorySlug.value)
})

watch(categorySlug, (val) => {
  books.setCategory(val)
})

useSeoMeta({
  title: computed(() => catMeta.value ? `${catMeta.value.label} Books — BookTech` : 'BookTech'),
  description: computed(() => catMeta.value?.description ?? ''),
})
</script>

<style lang="scss" scoped>
.category-page {
  padding-bottom: $space-9;

  &__hero {
    padding-block: $space-7;
    margin-bottom: $space-7;

    .container {
      display: flex;
      flex-direction: column;
      gap: $space-3;
    }
  }

  &__hero-icon {
    font-size: 3rem;
    line-height: 1;
  }

  &__hero-title {
    font-family: $font-display;
    font-size: $font-size-4xl;
    font-weight: $font-weight-bold;
    color: $color-text-inverse;
  }

  &__hero-desc {
    font-size: $font-size-lg;
    color: rgba(255, 255, 255, 0.65);
    max-width: 540px;
  }

  &__layout {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: $space-6;

    @media (max-width: 768px) { grid-template-columns: 1fr; }
  }

  &__sidebar {
    display: flex;
    flex-direction: column;
    gap: $space-5;
  }

  &__filter-group {
    padding-bottom: $space-5;
    border-bottom: 1px solid $color-border;
  }

  &__filter-label {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    margin-bottom: $space-3;
    color: $color-text-primary;
  }

  &__select {
    width: 100%;
    padding: $space-2 $space-3;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    background: $color-surface;
    font-size: $font-size-sm;
  }

  &__checkbox-label {
    display: flex;
    align-items: center;
    gap: $space-2;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    cursor: pointer;
  }

  &__count {
    font-size: $font-size-sm;
    color: $color-text-muted;
    margin-bottom: $space-4;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $space-4;

    @media (max-width: 900px)  { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 480px)  { grid-template-columns: 1fr; }
  }

  &__skeleton {
    border-radius: $radius-lg;
    overflow: hidden;
  }

  &__pagination {
    margin-top: $space-7;
    display: flex;
    justify-content: center;
  }
}
</style>
