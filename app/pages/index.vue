<template>
  <div class="home-page">
    <!-- Hero -->
    <section class="home-page__hero">
      <div class="home-page__hero-inner container">
        <div class="home-page__hero-text">
          <p class="home-page__hero-eyebrow">Welcome to BookTech</p>
          <h1 class="home-page__hero-title">
            Find your next<br />
            <em class="home-page__hero-em">great read.</em>
          </h1>
          <p class="home-page__hero-subtitle">
            Thousands of books across technology, science, business, fiction and more.
            Fast delivery. Curated picks. Exceptional prices.
          </p>
          <div class="home-page__hero-actions">
            <UiButton size="lg" @click="navigateTo('/books')">Browse all books →</UiButton>
            <UiButton variant="secondary" size="lg" @click="navigateTo('/categories')">
              Explore categories
            </UiButton>
          </div>
        </div>
        <div class="home-page__hero-visual" aria-hidden="true">
          <div
            v-for="cat in heroCategories"
            :key="cat.slug"
            class="home-page__spine"
            :style="{ background: cat.colors.dark, '--mid': cat.colors.mid }"
          >
            <span class="home-page__spine-label">{{ cat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Grid -->
    <section class="home-page__categories">
      <div class="container">
        <div class="home-page__section-header">
          <h2 class="home-page__section-title">Browse by category</h2>
          <NuxtLink to="/categories" class="home-page__section-link">View all →</NuxtLink>
        </div>
        <div class="home-page__categories-grid">
          <CategoryCard
            v-for="cat in categories.all"
            :key="cat.slug"
            :category="cat"
          />
        </div>
      </div>
    </section>

    <!-- Featured Books -->
    <section class="home-page__featured">
      <div class="container">
        <div class="home-page__section-header">
          <h2 class="home-page__section-title">Featured books</h2>
          <NuxtLink to="/books" class="home-page__section-link">View all →</NuxtLink>
        </div>

        <CategoryFilter v-model="selectedCategory" class="home-page__filters" />

        <div v-if="booksStatus === 'pending'" class="home-page__books-grid">
          <div v-for="n in 8" :key="n" class="home-page__skeleton-card">
            <UiSkeleton height="200px" />
            <div class="home-page__skeleton-body">
              <UiSkeleton height="12px" width="60%" />
              <UiSkeleton height="16px" />
              <UiSkeleton height="12px" width="80%" />
            </div>
          </div>
        </div>

        <div v-else-if="booksError" class="home-page__error">
          <p>Failed to load books. Please try again.</p>
          <UiButton variant="secondary" size="sm" @click="refreshBooks">Retry</UiButton>
        </div>

        <div v-else class="home-page__books-grid">
          <BookCard
            v-for="book in featuredBooks"
            :key="book.id"
            :book="book"
          />
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="home-page__newsletter">
      <div class="container">
        <div class="home-page__newsletter-inner">
          <div class="home-page__newsletter-text">
            <h2 class="home-page__newsletter-title">Stay in the loop</h2>
            <p class="home-page__newsletter-subtitle">
              New arrivals, staff picks, and exclusive deals — straight to your inbox.
            </p>
          </div>
          <form class="home-page__newsletter-form" @submit.prevent="handleNewsletterSubmit">
            <input
              v-model="emailInput"
              type="email"
              placeholder="your@email.com"
              class="home-page__newsletter-input"
              required
              aria-label="Email address"
            />
            <UiButton type="submit" :loading="newsletterLoading">Subscribe</UiButton>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { BookCategory, Book } from '~/types/book.types'

useSeoMeta({
  title: 'BookTech — Your destination for great reads',
  description: 'Discover thousands of books across technology, science, business, fiction and more. Fast delivery and great prices.',
  ogTitle: 'BookTech',
  ogDescription: 'Your destination for great reads.',
})

const categories = useCategories()

const heroCategories = computed(() =>
  categories.all.slice(0, 6)
)

const selectedCategory = ref<BookCategory | null>(null)

const { data: booksData, error: booksError, status: booksStatus, refresh: refreshBooks } = useFetch<{ books: Book[] }>('/api/books', {
  query: computed(() => ({
    category: selectedCategory.value ?? undefined,
    perPage: 8,
    sortBy: 'relevance',
  })),
  watch: [selectedCategory],
})

const featuredBooks = computed(() => booksData.value?.books ?? [])

const emailInput = ref<string>('')
const newsletterLoading = ref<boolean>(false)

const handleNewsletterSubmit = async (): Promise<void> => {
  newsletterLoading.value = true
  try {
    await $fetch('/api/newsletter', { method: 'POST', body: { email: emailInput.value } })
    emailInput.value = ''
  } catch (err) {
    console.error('[Newsletter] subscribe error:', err)
  } finally {
    newsletterLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  &__hero {
    background-color: $color-surface-dark;
    padding-block: $space-9;
    overflow: hidden;
  }

  &__hero-inner {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: $space-8;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__hero-eyebrow {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $cat-technology-mid;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: $space-3;
  }

  &__hero-title {
    font-family: $font-display;
    font-size: clamp(#{$font-size-4xl}, 5vw, #{$font-size-6xl});
    font-weight: $font-weight-bold;
    color: $color-text-inverse;
    line-height: $line-height-tight;
    margin-bottom: $space-4;
  }

  &__hero-em {
    font-style: italic;
    color: $cat-technology-mid;
  }

  &__hero-subtitle {
    font-size: $font-size-lg;
    color: rgba(255, 255, 255, 0.6);
    line-height: $line-height-base;
    max-width: 480px;
    margin-bottom: $space-6;
  }

  &__hero-actions {
    display: flex;
    gap: $space-3;
    flex-wrap: wrap;
  }

  &__hero-visual {
    display: flex;
    gap: $space-2;
    align-items: flex-end;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__spine {
    width: 44px;
    border-radius: $radius-sm;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: spine-float 3s ease-in-out infinite;

    @for $i from 1 through 6 {
      &:nth-child(#{$i}) {
        height: #{80 + ($i * 20)}px;
        animation-delay: #{($i - 1) * 0.4}s;
      }
    }
  }

  &__spine-label {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: var(--mid);
    padding-block: $space-2;
  }

  &__categories {
    padding-block: $space-8;
  }

  &__section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $space-5;
  }

  &__section-title {
    font-family: $font-display;
    font-size: $font-size-2xl;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
  }

  &__section-link {
    font-size: $font-size-sm;
    color: $cat-technology-mid;
    font-weight: $font-weight-medium;
    transition: opacity $transition-base;

    &:hover { opacity: 0.75; }
  }

  &__categories-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: $space-3;

    @media (max-width: 1024px) { grid-template-columns: repeat(4, 1fr); }
    @media (max-width: 768px)  { grid-template-columns: repeat(3, 1fr); }
    @media (max-width: 480px)  { grid-template-columns: repeat(2, 1fr); }
  }

  &__featured {
    padding-block: $space-8;
    background-color: $color-surface-alt;
  }

  &__filters {
    margin-bottom: $space-5;
  }

  &__books-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $space-4;

    @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
    @media (max-width: 768px)  { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 480px)  { grid-template-columns: 1fr; }
  }

  &__skeleton-card {
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

  &__error {
    text-align: center;
    padding: $space-8;
    color: $color-text-secondary;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-4;
  }

  &__newsletter {
    background-color: $color-surface-dark;
    padding-block: $space-8;
    margin-top: $space-8;
  }

  &__newsletter-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-6;
    flex-wrap: wrap;
  }

  &__newsletter-title {
    font-family: $font-display;
    font-size: $font-size-2xl;
    font-weight: $font-weight-medium;
    color: $color-text-inverse;
    margin-bottom: $space-2;
  }

  &__newsletter-subtitle {
    font-size: $font-size-sm;
    color: rgba(255, 255, 255, 0.55);
    max-width: 400px;
  }

  &__newsletter-form {
    display: flex;
    gap: $space-3;
    flex-shrink: 0;
  }

  &__newsletter-input {
    padding: $space-3 $space-4;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: $radius-md;
    color: $color-text-inverse;
    font-size: $font-size-sm;
    width: 260px;
    transition: border-color $transition-base;

    &::placeholder { color: rgba(255, 255, 255, 0.4); }

    &:focus {
      outline: none;
      border-color: $cat-technology-mid;
    }
  }
}

@keyframes spine-float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}
</style>
