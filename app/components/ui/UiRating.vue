<template>
  <div
    class="ui-rating"
    :class="`ui-rating--${size}`"
    role="img"
    :aria-label="`${value} out of 5 stars`"
  >
    <span
      v-for="n in 5"
      :key="n"
      class="ui-rating__star"
      :class="{
        'ui-rating__star--full': n <= Math.floor(value),
        'ui-rating__star--half': n === Math.ceil(value) && value % 1 >= 0.5,
      }"
      aria-hidden="true"
    >★</span>
    <span v-if="showCount && count !== undefined" class="ui-rating__count">
      ({{ count.toLocaleString() }})
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: number
  count?: number
  showCount?: boolean
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  count: undefined,
  showCount: false,
  size: 'md',
})
</script>

<style lang="scss" scoped>
.ui-rating {
  display: inline-flex;
  align-items: center;
  gap: $space-1;

  &--sm { font-size: $font-size-xs; }
  &--md { font-size: $font-size-sm; }
  &--lg { font-size: $font-size-base; }

  &__star {
    color: $color-border-strong;

    &--full,
    &--half {
      color: $color-warning;
    }
  }

  &__count {
    font-size: $font-size-xs;
    color: $color-text-muted;
    margin-left: $space-1;
  }
}
</style>
