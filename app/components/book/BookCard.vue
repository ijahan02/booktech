<template>
  <article
    class="book-card"
    :class="`book-card--${book.category}`"
    :style="categoryVars"
  >
    <div class="book-card__badges">
      <span
        v-for="badge in book.badges"
        :key="badge"
        class="book-card__badge"
        :class="`book-card__badge--${badge}`"
      >
        {{ badgeLabel(badge) }}
      </span>
    </div>

    <button
      class="book-card__wishlist"
      :aria-label="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
      @click.stop="wishlist.toggle(book)"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" :fill="isWishlisted ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>

    <NuxtLink :to="`/books/${book.slug}`" class="book-card__cover-link">
      <div class="book-card__cover">
        <NuxtImg
          :src="book.coverUrl"
          :alt="`Cover of ${book.title}`"
          width="120"
          height="170"
          format="webp"
          loading="lazy"
          class="book-card__cover-img"
        />
      </div>
    </NuxtLink>

    <div class="book-card__body">
      <div class="book-card__rating" :aria-label="`Rating: ${book.rating} out of 5`">
        <span class="book-card__stars" aria-hidden="true">
          {{ starsDisplay }}
        </span>
        <span class="book-card__review-count">({{ book.reviewCount }})</span>
      </div>

      <NuxtLink :to="`/books/${book.slug}`" class="book-card__title-link">
        <h3 class="book-card__title">{{ book.title }}</h3>
      </NuxtLink>

      <p class="book-card__author">{{ book.author.name }}</p>

      <div class="book-card__footer">
        <div class="book-card__price-block">
          <span v-if="book.salePrice" class="book-card__price book-card__price--sale">
            ${{ book.salePrice.toFixed(2) }}
          </span>
          <span
            class="book-card__price"
            :class="{ 'book-card__price--original': book.salePrice }"
          >
            ${{ book.price.toFixed(2) }}
          </span>
        </div>

        <button
          class="book-card__add-btn"
          :disabled="!book.inStock"
          :aria-label="`Add ${book.title} to cart`"
          @click="handleAddToCart"
        >
          {{ book.inStock ? '+ Add' : 'Sold out' }}
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Book, BookBadge } from '~/types/book.types'

interface Props {
  book: Book
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'add-to-cart': [book: Book]
}>()

const cart = useCart()
const wishlist = useWishlist()
const { getCssVars } = useCategories()

const categoryVars = computed(() => getCssVars(props.book.category))

const isWishlisted = computed(() => wishlist.isWishlisted(props.book.id))

const starsDisplay = computed(() => {
  const full = Math.floor(props.book.rating)
  const half = props.book.rating % 1 >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
})

const BADGE_LABELS: Record<BookBadge, string> = {
  new: 'New',
  bestseller: 'Bestseller',
  sale: 'Sale',
  'staff-pick': 'Staff Pick',
}

const badgeLabel = (badge: BookBadge): string => BADGE_LABELS[badge]

const handleAddToCart = (): void => {
  cart.addItem(props.book)
  emit('add-to-cart', props.book)
}
</script>

<style lang="scss" scoped>
.book-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--cat-light, #{$color-surface});
  border: 1px solid $color-border;
  border-radius: $radius-lg;
  overflow: hidden;
  transition: transform $transition-base, box-shadow $transition-base;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-hover;
  }

  // Category color modifiers
  &--technology { --cat-light: #{$cat-technology-light}; --cat-mid: #{$cat-technology-mid}; --cat-dark: #{$cat-technology-dark}; }
  &--science    { --cat-light: #{$cat-science-light};    --cat-mid: #{$cat-science-mid};    --cat-dark: #{$cat-science-dark}; }
  &--business   { --cat-light: #{$cat-business-light};   --cat-mid: #{$cat-business-mid};   --cat-dark: #{$cat-business-dark}; }
  &--fiction    { --cat-light: #{$cat-fiction-light};    --cat-mid: #{$cat-fiction-mid};    --cat-dark: #{$cat-fiction-dark}; }
  &--history    { --cat-light: #{$cat-history-light};    --cat-mid: #{$cat-history-mid};    --cat-dark: #{$cat-history-dark}; }
  &--design     { --cat-light: #{$cat-design-light};     --cat-mid: #{$cat-design-mid};     --cat-dark: #{$cat-design-dark}; }
  &--philosophy { --cat-light: #{$cat-philosophy-light}; --cat-mid: #{$cat-philosophy-mid}; --cat-dark: #{$cat-philosophy-dark}; }
  &--self-help  { --cat-light: #{$cat-self-help-light};  --cat-mid: #{$cat-self-help-mid};  --cat-dark: #{$cat-self-help-dark}; }
  &--travel     { --cat-light: #{$cat-travel-light};     --cat-mid: #{$cat-travel-mid};     --cat-dark: #{$cat-travel-dark}; }
  &--cooking    { --cat-light: #{$cat-cooking-light};    --cat-mid: #{$cat-cooking-mid};    --cat-dark: #{$cat-cooking-dark}; }

  &__badges {
    position: absolute;
    top: $space-3;
    left: $space-3;
    display: flex;
    flex-direction: column;
    gap: $space-1;
    z-index: 1;
  }

  &__badge {
    display: inline-block;
    padding: 2px $space-2;
    border-radius: $radius-full;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    background-color: var(--cat-mid);
    color: $color-surface;

    &--sale {
      background-color: $color-danger;
    }

    &--staff-pick {
      background-color: $color-warning;
      color: $color-text-primary;
    }
  }

  &__wishlist {
    position: absolute;
    top: $space-3;
    right: $space-3;
    z-index: 1;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.85);
    border: none;
    border-radius: $radius-full;
    color: $color-text-secondary;
    cursor: pointer;
    transition: color $transition-base, background-color $transition-base;

    &:hover {
      color: $color-danger;
      background-color: $color-surface;
    }
  }

  &__cover-link {
    display: block;
  }

  &__cover {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $space-5;
    height: 220px;
  }

  &__cover-img {
    width: 120px;
    height: 170px;
    border-radius: $radius-sm;
    box-shadow: $shadow-card;
    object-fit: cover;
    flex-shrink: 0;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    padding: $space-4;
    background-color: $color-surface;
    flex: 1;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: $space-1;
  }

  &__stars {
    font-size: $font-size-xs;
    color: $color-warning;
    letter-spacing: 0.02em;
  }

  &__review-count {
    font-size: $font-size-xs;
    color: $color-text-muted;
  }

  &__title-link {
    display: block;
  }

  &__title {
    font-family: $font-display;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
    line-height: $line-height-snug;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__author {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: $space-2;
  }

  &__price-block {
    display: flex;
    align-items: baseline;
    gap: $space-2;
  }

  &__price {
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    color: $color-text-primary;

    &--sale {
      color: $color-danger;
    }

    &--original {
      font-size: $font-size-sm;
      color: $color-text-muted;
      text-decoration: line-through;
    }
  }

  &__add-btn {
    padding: $space-2 $space-3;
    background-color: var(--cat-dark);
    color: $color-surface;
    border: none;
    border-radius: $radius-md;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    cursor: pointer;
    transition: opacity $transition-base;

    &:hover {
      opacity: 0.85;
    }

    &:disabled {
      background-color: $color-border;
      color: $color-text-muted;
      cursor: not-allowed;
    }
  }
}
</style>
