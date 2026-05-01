<template>
  <div class="checkout-layout">
    <header class="checkout-layout__header">
      <NuxtLink to="/" class="checkout-layout__logo">
        Book<span class="checkout-layout__logo-accent">Tech</span>
      </NuxtLink>
      <div class="checkout-layout__steps">
        <span
          v-for="(step, i) in steps"
          :key="step"
          class="checkout-layout__step"
          :class="{ 'checkout-layout__step--active': i <= currentStep }"
        >
          {{ step }}
        </span>
      </div>
    </header>
    <main class="checkout-layout__main container">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const steps = ['Cart', 'Checkout', 'Confirmation']

const currentStep = computed<number>(() => {
  if (route.path.includes('success')) return 2
  if (route.path.includes('checkout')) return 1
  return 0
})
</script>

<style lang="scss" scoped>
.checkout-layout {
  min-height: 100vh;
  background-color: $color-surface-alt;

  &__header {
    background-color: $color-surface;
    border-bottom: 1px solid $color-border;
    padding: $space-4 $space-6;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    font-family: $font-display;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
  }

  &__logo-accent {
    color: $cat-technology-mid;
  }

  &__steps {
    display: flex;
    gap: $space-5;
    align-items: center;
  }

  &__step {
    font-size: $font-size-sm;
    color: $color-text-muted;
    position: relative;

    &:not(:last-child)::after {
      content: '→';
      margin-left: $space-5;
      color: $color-border-strong;
    }

    &--active {
      color: $color-text-primary;
      font-weight: $font-weight-medium;
    }
  }

  &__main {
    padding-top: $space-7;
    padding-bottom: $space-9;
  }
}
</style>
