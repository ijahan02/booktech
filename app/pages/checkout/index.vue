<template>
  <div class="checkout-page">
    <div class="checkout-page__layout">
      <!-- Form -->
      <div class="checkout-page__form-col">
        <section class="checkout-page__section">
          <h2 class="checkout-page__section-title">Contact</h2>
          <div class="checkout-page__field">
            <label class="checkout-page__label" for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="checkout-page__input"
              placeholder="you@example.com"
              required
            />
          </div>
        </section>

        <section class="checkout-page__section">
          <h2 class="checkout-page__section-title">Shipping</h2>
          <div class="checkout-page__field-row">
            <div class="checkout-page__field">
              <label class="checkout-page__label" for="firstName">First name</label>
              <input id="firstName" v-model="form.firstName" type="text" class="checkout-page__input" required />
            </div>
            <div class="checkout-page__field">
              <label class="checkout-page__label" for="lastName">Last name</label>
              <input id="lastName" v-model="form.lastName" type="text" class="checkout-page__input" required />
            </div>
          </div>
          <div class="checkout-page__field">
            <label class="checkout-page__label" for="address">Address</label>
            <input id="address" v-model="form.address" type="text" class="checkout-page__input" required />
          </div>
          <div class="checkout-page__field-row">
            <div class="checkout-page__field">
              <label class="checkout-page__label" for="city">City</label>
              <input id="city" v-model="form.city" type="text" class="checkout-page__input" required />
            </div>
            <div class="checkout-page__field">
              <label class="checkout-page__label" for="zip">ZIP / Postal code</label>
              <input id="zip" v-model="form.zip" type="text" class="checkout-page__input" required />
            </div>
          </div>
        </section>

        <UiButton full-width size="lg" :loading="isSubmitting" @click="handleCheckout">
          Pay ${{ orderTotal.toFixed(2) }} →
        </UiButton>
      </div>

      <!-- Summary -->
      <aside class="checkout-page__summary">
        <h2 class="checkout-page__section-title">Order summary</h2>
        <ul class="checkout-page__item-list">
          <li
            v-for="item in cart.items"
            :key="item.book.id"
            class="checkout-page__item"
          >
            <div
              class="checkout-page__item-qty-badge"
              :style="{ background: '#1A1916', color: '#fff' }"
            >
              {{ item.quantity }}
            </div>
            <span class="checkout-page__item-name">{{ item.book.title }}</span>
            <span class="checkout-page__item-price">
              ${{ ((item.book.salePrice ?? item.book.price) * item.quantity).toFixed(2) }}
            </span>
          </li>
        </ul>
        <div class="checkout-page__totals">
          <div class="checkout-page__total-row">
            <span>Subtotal</span><span>${{ cart.subtotal.toFixed(2) }}</span>
          </div>
          <div class="checkout-page__total-row">
            <span>Shipping</span>
            <span>{{ cart.subtotal >= 35 ? 'Free' : '$4.99' }}</span>
          </div>
          <div class="checkout-page__total-row checkout-page__total-row--grand">
            <span>Total</span><span>${{ orderTotal.toFixed(2) }}</span>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'checkout' })

useSeoMeta({ title: 'Checkout — BookTech' })

const cart = useCart()

if (cart.isEmpty) {
  await navigateTo('/cart')
}

const form = reactive({
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  zip: '',
})

const orderTotal = computed<number>(() => {
  const shipping = cart.subtotal >= 35 ? 0 : 4.99
  return cart.subtotal + shipping
})

const isSubmitting = ref<boolean>(false)

const handleCheckout = async (): Promise<void> => {
  isSubmitting.value = true
  try {
    const { url } = await $fetch<{ url: string; sessionId: string }>('/api/cart/checkout', {
      method: 'POST',
      body: { items: cart.items },
    })
    cart.clearCart()
    window.location.href = url
  } catch (err) {
    console.error('[Checkout] error:', err)
    isSubmitting.value = false
  }
}
</script>

<style lang="scss" scoped>
.checkout-page {
  &__layout {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: $space-8;
    align-items: start;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  &__form-col {
    display: flex;
    flex-direction: column;
    gap: $space-6;
  }

  &__section {
    background: $color-surface;
    border: 1px solid $color-border;
    border-radius: $radius-xl;
    padding: $space-6;
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__section-title {
    font-family: $font-display;
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    margin-bottom: $space-1;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    flex: 1;
  }

  &__field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $space-4;
  }

  &__label {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
  }

  &__input {
    padding: $space-3 $space-4;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    font-size: $font-size-sm;
    background: $color-surface;
    color: $color-text-primary;
    transition: border-color $transition-base;

    &:focus {
      outline: none;
      border-color: $cat-technology-mid;
    }
  }

  &__summary {
    background: $color-surface;
    border: 1px solid $color-border;
    border-radius: $radius-xl;
    padding: $space-6;
    position: sticky;
    top: calc(#{$header-height} + #{$space-4});
  }

  &__item-list {
    margin-block: $space-4;
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: $space-3;
    font-size: $font-size-sm;
  }

  &__item-qty-badge {
    width: 20px;
    height: 20px;
    border-radius: $radius-full;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__item-name {
    flex: 1;
    color: $color-text-secondary;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__item-price {
    font-weight: $font-weight-medium;
  }

  &__totals {
    border-top: 1px solid $color-border;
    padding-top: $space-4;
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__total-row {
    display: flex;
    justify-content: space-between;
    font-size: $font-size-sm;
    color: $color-text-secondary;

    &--grand {
      font-size: $font-size-lg;
      font-weight: $font-weight-bold;
      color: $color-text-primary;
      padding-top: $space-3;
      border-top: 1px solid $color-border;
    }
  }
}
</style>
