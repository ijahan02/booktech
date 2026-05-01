<template>
  <div class="success-page">
    <div class="success-page__card">
      <div class="success-page__icon" aria-hidden="true">✅</div>
      <h1 class="success-page__title">Order Confirmed!</h1>
      <p class="success-page__message">
        Thank you for your order. We've sent a confirmation to your email.
        Your books will be on their way soon.
      </p>
      <div class="success-page__actions">
        <UiButton size="lg" @click="navigateTo('/books')">Continue shopping →</UiButton>
        <UiButton variant="secondary" size="lg" @click="navigateTo('/account/orders')">
          View orders
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'checkout' })

useSeoMeta({ title: 'Order Confirmed — BookTech' })
</script>

<style lang="scss" scoped>
.success-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;

  &__card {
    text-align: center;
    max-width: 480px;
    padding: $space-8;
    background: $color-surface;
    border: 1px solid $color-border;
    border-radius: $radius-xl;
  }

  &__icon {
    font-size: 3.5rem;
    margin-bottom: $space-5;
  }

  &__title {
    font-family: $font-display;
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    margin-bottom: $space-4;
  }

  &__message {
    font-size: $font-size-base;
    color: $color-text-secondary;
    line-height: $line-height-base;
    margin-bottom: $space-6;
  }

  &__actions {
    display: flex;
    gap: $space-3;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
