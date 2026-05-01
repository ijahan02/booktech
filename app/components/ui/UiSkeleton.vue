<template>
  <div
    class="ui-skeleton"
    :class="[`ui-skeleton--${variant}`]"
    :style="{ width, height, borderRadius: radius }"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
interface Props {
  variant?: 'text' | 'rect' | 'circle'
  width?: string
  height?: string
  radius?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'rect',
  width: '100%',
  height: '16px',
  radius: undefined,
})
</script>

<style lang="scss" scoped>
@use "sass:color";

.ui-skeleton {
  background: linear-gradient(
    90deg,
    $color-border 25%,
    color.adjust($color-surface-alt, $lightness: -3%) 50%,
    $color-border 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;

  &--circle { border-radius: $radius-full; }
  &--text   { border-radius: $radius-sm; }
  &--rect   { border-radius: $radius-md; }
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
