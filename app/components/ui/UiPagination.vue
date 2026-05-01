<template>
  <nav class="ui-pagination" aria-label="Pagination">
    <button
      class="ui-pagination__btn"
      :disabled="modelValue <= 1"
      aria-label="Previous page"
      @click="emit('update:modelValue', modelValue - 1)"
    >
      ←
    </button>

    <button
      v-for="p in pages"
      :key="p"
      class="ui-pagination__btn"
      :class="{ 'ui-pagination__btn--active': p === modelValue, 'ui-pagination__btn--ellipsis': p === '…' }"
      :disabled="p === '…'"
      :aria-label="p === '…' ? undefined : `Page ${p}`"
      :aria-current="p === modelValue ? 'page' : undefined"
      @click="typeof p === 'number' && emit('update:modelValue', p)"
    >
      {{ p }}
    </button>

    <button
      class="ui-pagination__btn"
      :disabled="modelValue >= total"
      aria-label="Next page"
      @click="emit('update:modelValue', modelValue + 1)"
    >
      →
    </button>
  </nav>
</template>

<script setup lang="ts">
interface Props {
  modelValue: number
  total: number
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [page: number] }>()

const pages = computed<(number | string)[]>(() => {
  const { modelValue: cur, total } = props
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (cur <= 4) return [1, 2, 3, 4, 5, '…', total]
  if (cur >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '…', cur - 1, cur, cur + 1, '…', total]
})
</script>

<style lang="scss" scoped>
.ui-pagination {
  display: flex;
  align-items: center;
  gap: $space-1;

  &__btn {
    min-width: 36px;
    height: 36px;
    padding: 0 $space-2;
    border: 1px solid $color-border;
    background: $color-surface;
    border-radius: $radius-md;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    cursor: pointer;
    transition: all $transition-base;

    &:hover:not(:disabled):not(&--ellipsis) {
      border-color: $color-text-primary;
      color: $color-text-primary;
    }

    &--active {
      background-color: $color-text-primary;
      color: $color-surface;
      border-color: $color-text-primary;
    }

    &--ellipsis {
      border-color: transparent;
      cursor: default;
    }

    &:disabled:not(&--ellipsis) {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
}
</style>
