<template>
  <div class="cart-page">
    <div class="container">
      <h1 class="cart-page__title">Your Cart</h1>

      <div v-if="cart.isEmpty" class="cart-page__empty">
        <span class="cart-page__empty-icon" aria-hidden="true">🛒</span>
        <p class="cart-page__empty-text">Your cart is empty.</p>
        <UiButton @click="navigateTo('/books')">Browse books →</UiButton>
      </div>

      <div v-else class="cart-page__layout">
        <div class="cart-page__items">
          <article
            v-for="item in cart.items"
            :key="item.book.id"
            class="cart-page__item"
          >
            <NuxtImg
              :src="item.book.coverUrl"
              :alt="item.book.title"
              width="80"
              height="108"
              format="webp"
              class="cart-page__item-cover"
            />
            <div class="cart-page__item-info">
              <NuxtLink :to="`/books/${item.book.slug}`" class="cart-page__item-title">
                {{ item.book.title }}
              </NuxtLink>
              <p class="cart-page__item-author">{{ item.book.author.name }}</p>
              <UiBadge
                :variant="item.book.category === 'technology' ? 'info' : 'default'"
              >
                {{ item.book.category }}
              </UiBadge>
            </div>
            <div class="cart-page__item-qty">
              <button
                class="cart-page__qty-btn"
                @click="cart.updateQuantity(item.book.id, item.quantity - 1)"
              >−</button>
              <span class="cart-page__qty-val">{{ item.quantity }}</span>
              <button
                class="cart-page__qty-btn"
                @click="cart.updateQuantity(item.book.id, item.quantity + 1)"
              >+</button>
            </div>
            <div class="cart-page__item-price">
              ${{ ((item.book.salePrice ?? item.book.price) * item.quantity).toFixed(2) }}
            </div>
            <button
              class="cart-page__item-remove"
              :aria-label="`Remove ${item.book.title}`"
              @click="cart.removeItem(item.book.id)"
            >✕</button>
          </article>
        </div>

        <aside class="cart-page__summary">
          <h2 class="cart-page__summary-title">Order summary</h2>
          <div class="cart-page__summary-row">
            <span>Subtotal ({{ cart.itemCount }} items)</span>
            <span>${{ cart.subtotal.toFixed(2) }}</span>
          </div>
          <div class="cart-page__summary-row">
            <span>Shipping</span>
            <span class="cart-page__free-ship">
              {{ cart.subtotal >= 35 ? 'Free' : '$4.99' }}
            </span>
          </div>
          <div v-if="cart.subtotal < 35" class="cart-page__free-ship-note">
            Add ${{ (35 - cart.subtotal).toFixed(2) }} more for free shipping
          </div>
          <div class="cart-page__summary-total">
            <span>Total</span>
            <span>${{ orderTotal.toFixed(2) }}</span>
          </div>
          <UiButton full-width size="lg" @click="navigateTo('/checkout')">
            Proceed to Checkout →
          </UiButton>
          <button class="cart-page__continue" @click="navigateTo('/books')">
            Continue shopping
          </button>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Cart — BookTech' })

const cart = useCart()

const orderTotal = computed<number>(() => {
  const shipping = cart.subtotal >= 35 ? 0 : 4.99
  return cart.subtotal + shipping
})
</script>

<style lang="scss" scoped>
.cart-page {
  padding-block: $space-8;

  &__title {
    font-family: $font-display;
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    margin-bottom: $space-7;
  }

  &__empty {
    text-align: center;
    padding: $space-10 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-4;
  }

  &__empty-icon { font-size: 4rem; }

  &__empty-text {
    font-size: $font-size-lg;
    color: $color-text-secondary;
  }

  &__layout {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: $space-8;
    align-items: start;

    @media (max-width: 900px) { grid-template-columns: 1fr; }
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__item {
    display: grid;
    grid-template-columns: 80px 1fr auto auto auto;
    gap: $space-4;
    align-items: center;
    padding: $space-4;
    background: $color-surface;
    border: 1px solid $color-border;
    border-radius: $radius-lg;
  }

  &__item-cover {
    border-radius: $radius-sm;
    object-fit: cover;
  }

  &__item-info {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    min-width: 0;
  }

  &__item-title {
    font-weight: $font-weight-medium;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color $transition-base;

    &:hover { color: $cat-technology-mid; }
  }

  &__item-author {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__item-qty {
    display: flex;
    align-items: center;
    gap: $space-2;
  }

  &__qty-btn {
    width: 28px;
    height: 28px;
    border: 1px solid $color-border;
    background: transparent;
    border-radius: $radius-sm;
    cursor: pointer;
    font-size: $font-size-base;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color $transition-base;

    &:hover { background-color: $color-surface-alt; }
  }

  &__qty-val {
    font-weight: $font-weight-medium;
    min-width: 24px;
    text-align: center;
  }

  &__item-price {
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    white-space: nowrap;
  }

  &__item-remove {
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    color: $color-text-muted;
    cursor: pointer;
    font-size: $font-size-xs;
    border-radius: $radius-sm;
    transition: color $transition-base;

    &:hover { color: $color-danger; }
  }

  &__summary {
    background: $color-surface;
    border: 1px solid $color-border;
    border-radius: $radius-xl;
    padding: $space-6;
    display: flex;
    flex-direction: column;
    gap: $space-4;
    position: sticky;
    top: calc(#{$header-height} + #{$space-4});
  }

  &__summary-title {
    font-family: $font-display;
    font-size: $font-size-xl;
    font-weight: $font-weight-medium;
  }

  &__summary-row {
    display: flex;
    justify-content: space-between;
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__free-ship { color: $color-success; font-weight: $font-weight-medium; }

  &__free-ship-note {
    font-size: $font-size-xs;
    color: $color-text-muted;
    background: $color-surface-alt;
    padding: $space-2 $space-3;
    border-radius: $radius-md;
    text-align: center;
  }

  &__summary-total {
    display: flex;
    justify-content: space-between;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    padding-top: $space-3;
    border-top: 1px solid $color-border;
  }

  &__continue {
    background: none;
    border: none;
    font-size: $font-size-sm;
    color: $color-text-muted;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-align: center;
    transition: color $transition-base;

    &:hover { color: $color-text-primary; }
  }
}
</style>
