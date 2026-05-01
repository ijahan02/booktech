<template>
  <div class="book-detail">
    <div v-if="status === 'pending'" class="book-detail__loading container">
      <UiSkeleton height="400px" radius="16px" />
    </div>

    <div v-else-if="error || !book" class="book-detail__error container">
      <p>Book not found.</p>
      <UiButton variant="secondary" @click="navigateTo('/books')">Back to books</UiButton>
    </div>

    <template v-else>
      <!-- Category hero banner -->
      <div
        class="book-detail__banner"
        :style="{ background: catColors.dark }"
        aria-hidden="true"
      >
        <div class="container">
          <NuxtLink
            :to="`/categories/${book.category}`"
            class="book-detail__breadcrumb"
            :style="{ color: catColors.mid }"
          >
            ← {{ catMeta?.label }}
          </NuxtLink>
        </div>
      </div>

      <div class="container">
        <div class="book-detail__layout">
          <!-- Cover column -->
          <div class="book-detail__cover-col">
            <div
              class="book-detail__cover-wrap"
              :style="{ background: catColors.light }"
            >
              <NuxtImg
                :src="book.coverUrl"
                :alt="`Cover of ${book.title}`"
                width="280"
                height="380"
                format="webp"
                class="book-detail__cover-img"
              />
            </div>
            <div class="book-detail__cover-actions">
              <UiButton
                full-width
                size="lg"
                :disabled="!book.inStock"
                @click="handleAddToCart"
              >
                {{ book.inStock ? 'Add to Cart' : 'Out of Stock' }}
              </UiButton>
              <UiButton
                variant="secondary"
                full-width
                size="lg"
                @click="wishlist.toggle(book)"
              >
                {{ wishlist.isWishlisted(book.id) ? '♥ Wishlisted' : '♡ Wishlist' }}
              </UiButton>
            </div>
          </div>

          <!-- Info column -->
          <div class="book-detail__info">
            <div class="book-detail__badges">
              <UiBadge
                v-for="badge in book.badges"
                :key="badge"
                :variant="badge === 'sale' ? 'danger' : badge === 'new' ? 'success' : 'default'"
              >
                {{ badge }}
              </UiBadge>
            </div>

            <h1 class="book-detail__title">{{ book.title }}</h1>
            <p v-if="book.subtitle" class="book-detail__subtitle">{{ book.subtitle }}</p>

            <p class="book-detail__author">
              by <strong>{{ book.author.name }}</strong>
            </p>

            <UiRating
              :value="book.rating"
              :count="book.reviewCount"
              show-count
              size="md"
              class="book-detail__rating"
            />

            <div class="book-detail__price-block">
              <span v-if="book.salePrice" class="book-detail__price book-detail__price--sale">
                ${{ book.salePrice.toFixed(2) }}
              </span>
              <span
                class="book-detail__price"
                :class="{ 'book-detail__price--crossed': book.salePrice }"
              >
                ${{ book.price.toFixed(2) }}
              </span>
              <UiBadge v-if="book.salePrice" variant="danger">
                Save ${{ (book.price - book.salePrice).toFixed(2) }}
              </UiBadge>
            </div>

            <!-- Tabs -->
            <div class="book-detail__tabs">
              <button
                v-for="tab in tabs"
                :key="tab"
                class="book-detail__tab"
                :class="{ 'book-detail__tab--active': activeTab === tab }"
                @click="activeTab = tab"
              >
                {{ tab }}
              </button>
            </div>

            <div class="book-detail__tab-content">
              <p v-if="activeTab === 'Description'" class="book-detail__description">
                {{ book.description }}
              </p>

              <dl v-else-if="activeTab === 'Details'" class="book-detail__meta">
                <div class="book-detail__meta-row">
                  <dt>ISBN</dt><dd class="text-mono">{{ book.isbn }}</dd>
                </div>
                <div class="book-detail__meta-row">
                  <dt>Pages</dt><dd>{{ book.pageCount }}</dd>
                </div>
                <div class="book-detail__meta-row">
                  <dt>Published</dt><dd>{{ new Date(book.publishedAt).getFullYear() }}</dd>
                </div>
                <div class="book-detail__meta-row">
                  <dt>Category</dt>
                  <dd>
                    <NuxtLink :to="`/categories/${book.category}`">
                      {{ catMeta?.label }}
                    </NuxtLink>
                  </dd>
                </div>
              </dl>

              <div v-else-if="activeTab === 'Reviews'" class="book-detail__reviews">
                <p class="book-detail__reviews-placeholder">Reviews coming soon.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Book } from '~/types/book.types'

const route = useRoute()
const slug = computed<string>(() => route.params.slug as string)

const { data: book, error, status } = useFetch<Book>(`/api/books/${slug.value}`, {
  key: `book-${slug.value}`,
})

const categories = useCategories()
const cart = useCart()
const wishlist = useWishlist()

const catColors = computed(() =>
  book.value ? categories.getColors(book.value.category) : { dark: '#1A1916', mid: '#fff', light: '#F8F7F4' }
)

const catMeta = computed(() =>
  book.value ? categories.getMeta(book.value.category) : null
)

useSeoMeta({
  title: computed(() => book.value ? `${book.value.title} — BookTech` : 'BookTech'),
  description: computed(() => book.value?.description ?? ''),
})

const tabs = ['Description', 'Details', 'Reviews'] as const
type Tab = typeof tabs[number]
const activeTab = ref<Tab>('Description')

const handleAddToCart = (): void => {
  if (book.value) cart.addItem(book.value)
}
</script>

<style lang="scss" scoped>
.book-detail {
  padding-bottom: $space-9;

  &__loading,
  &__error {
    padding-top: $space-7;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-4;
  }

  &__banner {
    height: 80px;
    margin-bottom: -40px;
  }

  &__breadcrumb {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    line-height: 80px;
    transition: opacity $transition-base;

    &:hover { opacity: 0.75; }
  }

  &__layout {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: $space-8;
    padding-top: $space-8;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__cover-col {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__cover-wrap {
    border-radius: $radius-xl;
    padding: $space-6;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__cover-img {
    border-radius: $radius-md;
    box-shadow: $shadow-hover;
    width: 100%;
    max-width: 240px;
    height: auto;
  }

  &__cover-actions {
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__badges {
    display: flex;
    gap: $space-2;
    flex-wrap: wrap;
    margin-bottom: $space-3;
  }

  &__title {
    font-family: $font-display;
    font-size: $font-size-4xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    line-height: $line-height-tight;
    margin-bottom: $space-2;
  }

  &__subtitle {
    font-size: $font-size-xl;
    color: $color-text-secondary;
    margin-bottom: $space-3;
  }

  &__author {
    font-size: $font-size-base;
    color: $color-text-secondary;
    margin-bottom: $space-3;
  }

  &__rating {
    margin-bottom: $space-4;
  }

  &__price-block {
    display: flex;
    align-items: baseline;
    gap: $space-3;
    margin-bottom: $space-5;
  }

  &__price {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;

    &--sale    { color: $color-danger; }
    &--crossed { font-size: $font-size-xl; color: $color-text-muted; text-decoration: line-through; }
  }

  &__tabs {
    display: flex;
    gap: 0;
    border-bottom: 1px solid $color-border;
    margin-bottom: $space-5;
  }

  &__tab {
    padding: $space-3 $space-5;
    border: none;
    background: transparent;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all $transition-base;
    margin-bottom: -1px;

    &:hover { color: $color-text-primary; }

    &--active {
      color: $color-text-primary;
      border-bottom-color: $color-text-primary;
    }
  }

  &__description {
    font-size: $font-size-base;
    line-height: $line-height-loose;
    color: $color-text-secondary;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__meta-row {
    display: flex;
    gap: $space-4;
    font-size: $font-size-sm;

    dt {
      color: $color-text-muted;
      min-width: 100px;
    }

    dd {
      color: $color-text-primary;
      font-weight: $font-weight-medium;

      a {
        color: $cat-technology-mid;
        &:hover { text-decoration: underline; }
      }
    }
  }

  &__reviews-placeholder {
    color: $color-text-muted;
    font-size: $font-size-sm;
  }
}
</style>
