<template>
  <Teleport to="body">
    <Transition name="drawer-overlay">
      <div
        v-if="cart.isOpen"
        class="cart-drawer__overlay"
        aria-hidden="true"
        @click="cart.closeCart()"
      />
    </Transition>

    <Transition name="drawer">
      <aside
        v-if="cart.isOpen"
        class="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div class="cart-drawer__header">
          <h2 class="cart-drawer__title">
            Cart
            <span v-if="!cart.isEmpty" class="cart-drawer__count">
              {{ cart.itemCount }}
            </span>
          </h2>
          <button
            class="cart-drawer__close"
            aria-label="Close cart"
            @click="cart.closeCart()"
          >
            ✕
          </button>
        </div>

        <div class="cart-drawer__body">
          <template v-if="cart.isEmpty">
            <div class="cart-drawer__empty">
              <span class="cart-drawer__empty-icon" aria-hidden="true">🛒</span>
              <p class="cart-drawer__empty-text">Your cart is empty</p>
              <button
                class="cart-drawer__browse-btn"
                @click="() => { cart.closeCart(); navigateTo('/books') }"
              >
                Browse books
              </button>
            </div>
          </template>

          <template v-else>
            <ul class="cart-drawer__items">
              <li
                v-for="item in cart.items"
                :key="item.book.id"
                class="cart-drawer__item"
              >
                <NuxtImg
                  :src="item.book.coverUrl"
                  :alt="item.book.title"
                  width="56"
                  height="76"
                  format="webp"
                  class="cart-drawer__item-cover"
                />
                <div class="cart-drawer__item-info">
                  <p class="cart-drawer__item-title">{{ item.book.title }}</p>
                  <p class="cart-drawer__item-author">{{ item.book.author.name }}</p>
                  <div class="cart-drawer__item-footer">
                    <div class="cart-drawer__item-qty">
                      <button
                        class="cart-drawer__qty-btn"
                        aria-label="Decrease quantity"
                        @click="cart.updateQuantity(item.book.id, item.quantity - 1)"
                      >−</button>
                      <span class="cart-drawer__qty-value">{{ item.quantity }}</span>
                      <button
                        class="cart-drawer__qty-btn"
                        aria-label="Increase quantity"
                        @click="cart.updateQuantity(item.book.id, item.quantity + 1)"
                      >+</button>
                    </div>
                    <span class="cart-drawer__item-price">
                      ${{ ((item.book.salePrice ?? item.book.price) * item.quantity).toFixed(2) }}
                    </span>
                  </div>
                </div>
                <button
                  class="cart-drawer__item-remove"
                  :aria-label="`Remove ${item.book.title}`"
                  @click="cart.removeItem(item.book.id)"
                >✕</button>
              </li>
            </ul>

            <div class="cart-drawer__summary">
              <div class="cart-drawer__subtotal">
                <span>Subtotal</span>
                <span>${{ cart.subtotal.toFixed(2) }}</span>
              </div>
              <p class="cart-drawer__shipping-note">Shipping calculated at checkout</p>
              <NuxtLink
                to="/checkout"
                class="cart-drawer__checkout-btn"
                @click="cart.closeCart()"
              >
                Checkout → ${{ cart.subtotal.toFixed(2) }}
              </NuxtLink>
              <button
                class="cart-drawer__continue-btn"
                @click="cart.closeCart()"
              >
                Continue shopping
              </button>
            </div>
          </template>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const cart = useCart()
</script>

<style lang="scss" scoped>
.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 420px;
  max-width: 100vw;
  background-color: $color-surface;
  z-index: $z-modal;
  display: flex;
  flex-direction: column;
  box-shadow: $shadow-modal;

  &__overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: $z-modal - 1;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $space-5 $space-6;
    border-bottom: 1px solid $color-border;
    flex-shrink: 0;
  }

  &__title {
    font-family: $font-display;
    font-size: $font-size-xl;
    font-weight: $font-weight-medium;
    display: flex;
    align-items: center;
    gap: $space-2;
  }

  &__count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: $color-text-primary;
    color: $color-surface;
    font-size: $font-size-xs;
    border-radius: $radius-full;
  }

  &__close {
    width: 36px;
    height: 36px;
    border: none;
    background: transparent;
    border-radius: $radius-md;
    font-size: $font-size-base;
    cursor: pointer;
    color: $color-text-secondary;
    transition: background-color $transition-base;

    &:hover {
      background-color: $color-surface-alt;
    }
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: $space-5 $space-6;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-4;
    padding-top: $space-9;
    text-align: center;
  }

  &__empty-icon {
    font-size: 3rem;
  }

  &__empty-text {
    color: $color-text-secondary;
  }

  &__browse-btn {
    padding: $space-3 $space-5;
    background-color: $color-text-primary;
    color: $color-surface;
    border: none;
    border-radius: $radius-md;
    cursor: pointer;
    font-weight: $font-weight-medium;
    transition: opacity $transition-base;

    &:hover {
      opacity: 0.85;
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__item {
    display: flex;
    gap: $space-4;
    padding-bottom: $space-4;
    border-bottom: 1px solid $color-border;
  }

  &__item-cover {
    width: 56px;
    height: 76px;
    border-radius: $radius-sm;
    object-fit: cover;
    flex-shrink: 0;
  }

  &__item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: $space-1;
    min-width: 0;
  }

  &__item-title {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__item-author {
    font-size: $font-size-xs;
    color: $color-text-secondary;
  }

  &__item-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
  }

  &__item-qty {
    display: flex;
    align-items: center;
    gap: $space-2;
  }

  &__qty-btn {
    width: 24px;
    height: 24px;
    border: 1px solid $color-border;
    background: transparent;
    border-radius: $radius-sm;
    font-size: $font-size-base;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    transition: background-color $transition-base;

    &:hover {
      background-color: $color-surface-alt;
    }
  }

  &__qty-value {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    min-width: 20px;
    text-align: center;
  }

  &__item-price {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
  }

  &__item-remove {
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    color: $color-text-muted;
    cursor: pointer;
    font-size: $font-size-xs;
    border-radius: $radius-sm;
    flex-shrink: 0;
    transition: color $transition-base;

    &:hover {
      color: $color-danger;
    }
  }

  &__summary {
    margin-top: $space-6;
    padding-top: $space-5;
    border-top: 1px solid $color-border;
  }

  &__subtotal {
    display: flex;
    justify-content: space-between;
    font-weight: $font-weight-medium;
    font-size: $font-size-lg;
    margin-bottom: $space-2;
  }

  &__shipping-note {
    font-size: $font-size-xs;
    color: $color-text-muted;
    margin-bottom: $space-4;
  }

  &__checkout-btn {
    display: block;
    width: 100%;
    padding: $space-4;
    background-color: $color-text-primary;
    color: $color-surface;
    text-align: center;
    font-weight: $font-weight-medium;
    border-radius: $radius-md;
    transition: opacity $transition-base;
    margin-bottom: $space-3;

    &:hover {
      opacity: 0.85;
    }
  }

  &__continue-btn {
    display: block;
    width: 100%;
    padding: $space-3;
    background: transparent;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    cursor: pointer;
    transition: border-color $transition-base;

    &:hover {
      border-color: $color-text-primary;
      color: $color-text-primary;
    }
  }
}

// Transitions
.drawer-enter-active,
.drawer-leave-active {
  transition: transform $transition-slow;
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

.drawer-overlay-enter-active,
.drawer-overlay-leave-active {
  transition: opacity $transition-slow;
}

.drawer-overlay-enter-from,
.drawer-overlay-leave-to {
  opacity: 0;
}
</style>
