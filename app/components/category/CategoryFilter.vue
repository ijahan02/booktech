<template>
  <div class="category-filter" role="group" aria-label="Filter by category">
    <button
      class="category-filter__pill"
      :class="{ 'category-filter__pill--active': modelValue === null }"
      @click="emit('update:modelValue', null)"
    >
      All
    </button>
    <button
      v-for="cat in categories.all"
      :key="cat.slug"
      class="category-filter__pill"
      :class="{ 'category-filter__pill--active': modelValue === cat.slug }"
      :style="modelValue === cat.slug ? {
        '--pill-bg': cat.colors.dark,
        '--pill-color': '#fff',
      } : {}"
      @click="emit('update:modelValue', cat.slug as BookCategory)"
    >
      <span aria-hidden="true">{{ cat.icon }}</span>
      {{ cat.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { BookCategory } from '~/types/book.types'

defineProps<{
  modelValue: BookCategory | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: BookCategory | null]
}>()

const categories = useCategories()
</script>

<style lang="scss" scoped>
.category-filter {
  display: flex;
  gap: $space-2;
  flex-wrap: wrap;

  &__pill {
    display: flex;
    align-items: center;
    gap: $space-1;
    padding: $space-2 $space-3;
    border: 1px solid $color-border;
    border-radius: $radius-full;
    background-color: $color-surface;
    color: $color-text-secondary;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    cursor: pointer;
    transition: all $transition-base;
    white-space: nowrap;

    &:hover {
      border-color: $color-text-primary;
      color: $color-text-primary;
    }

    &--active {
      background-color: var(--pill-bg, #{$color-text-primary});
      color: var(--pill-color, #{$color-surface});
      border-color: transparent;
    }
  }
}
</style>
