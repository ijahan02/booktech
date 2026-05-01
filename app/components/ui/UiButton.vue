<template>
  <component
    :is="tag"
    class="ui-button"
    :class="[
      `ui-button--${variant}`,
      `ui-button--${size}`,
      { 'ui-button--loading': loading, 'ui-button--full': fullWidth },
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="ui-button__spinner" aria-hidden="true" />
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  tag?: 'button' | 'a'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  tag: 'button',
  loading: false,
  disabled: false,
  fullWidth: false,
})
</script>

<style lang="scss" scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $space-2;
  font-weight: $font-weight-medium;
  border-radius: $radius-md;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all $transition-base;
  white-space: nowrap;
  text-decoration: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--full {
    width: 100%;
  }

  // Sizes
  &--sm { padding: $space-2 $space-3; font-size: $font-size-xs; }
  &--md { padding: $space-3 $space-5; font-size: $font-size-sm; }
  &--lg { padding: $space-4 $space-6; font-size: $font-size-base; }

  // Variants
  &--primary {
    background-color: $color-text-primary;
    color: $color-surface;

    &:hover:not(:disabled) {
      opacity: 0.85;
    }
  }

  &--secondary {
    background-color: $color-surface;
    color: $color-text-primary;
    border-color: $color-border;

    &:hover:not(:disabled) {
      border-color: $color-text-primary;
    }
  }

  &--ghost {
    background-color: transparent;
    color: $color-text-secondary;

    &:hover:not(:disabled) {
      background-color: $color-surface-alt;
      color: $color-text-primary;
    }
  }

  &--danger {
    background-color: $color-danger;
    color: $color-surface;

    &:hover:not(:disabled) {
      opacity: 0.85;
    }
  }

  &__spinner {
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: $radius-full;
    animation: spin 0.6s linear infinite;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
