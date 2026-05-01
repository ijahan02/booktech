<template>
  <span
    class="ui-badge"
    :class="[`ui-badge--${variant}`, `ui-badge--${size}`]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted'
  size?: 'sm' | 'md'
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'sm',
})
</script>

<style lang="scss" scoped>
.ui-badge {
  display: inline-flex;
  align-items: center;
  font-weight: $font-weight-medium;
  border-radius: $radius-full;
  white-space: nowrap;

  &--sm { padding: 2px $space-2; font-size: $font-size-xs; }
  &--md { padding: $space-1 $space-3; font-size: $font-size-sm; }

  &--default { background: $color-surface-alt;   color: $color-text-secondary; }
  &--success  { background: #ECFDF5;              color: #065F46; }
  &--warning  { background: #FFF8EC;              color: #92400E; }
  &--danger   { background: #FFF5F5;              color: #991B1B; }
  &--info     { background: $cat-technology-light; color: $cat-technology-dark; }
  &--muted    { background: $color-border;         color: $color-text-muted; }
}
</style>
