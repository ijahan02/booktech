<template>
  <NuxtLink
    :to="`/categories/${category.slug}`"
    class="category-card"
    :style="{
      '--cat-dark': category.colors.dark,
      '--cat-mid': category.colors.mid,
      '--cat-light': category.colors.light,
    }"
  >
    <span class="category-card__icon" aria-hidden="true">{{ category.icon }}</span>
    <h3 class="category-card__name">{{ category.label }}</h3>
    <p v-if="category.bookCount !== undefined" class="category-card__count">
      {{ category.bookCount.toLocaleString() }} books
    </p>
    <span class="category-card__arrow" aria-hidden="true">→</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { CategoryMeta } from '~/types/cart.types'

defineProps<{
  category: CategoryMeta
}>()
</script>

<style lang="scss" scoped>
.category-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: $space-2;
  padding: $space-5;
  background-color: var(--cat-dark);
  border: 1px solid transparent;
  border-radius: $radius-lg;
  transition: transform $transition-base, box-shadow $transition-base;
  min-height: 160px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-hover;

    .category-card__arrow {
      transform: translateX(4px);
    }

    .category-card__icon {
      transform: scale(1.15);
    }
  }

  &__icon {
    font-size: 2rem;
    display: block;
    transition: transform $transition-slow;
    line-height: 1;
  }

  &__name {
    font-family: $font-display;
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    color: $color-text-inverse;
    margin-top: auto;
  }

  &__count {
    font-size: $font-size-xs;
    color: var(--cat-mid);
    font-weight: $font-weight-medium;
  }

  &__arrow {
    font-size: $font-size-lg;
    color: var(--cat-mid);
    margin-top: $space-1;
    transition: transform $transition-base;
    display: block;
    align-self: flex-end;
  }
}
</style>
