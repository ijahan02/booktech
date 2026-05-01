<template>
  <header class="app-header">
    <!-- Auto-scrolling book/library photos -->
    <div class="app-header__bg" aria-hidden="true">
      <div
        v-for="(img, i) in bgImages"
        :key="i"
        class="app-header__bg-slide"
        :class="{ 'app-header__bg-slide--active': i === activeSlide }"
        :style="{ backgroundImage: `url(${img})` }"
      />
      <div class="app-header__bg-overlay" />
    </div>

    <div class="app-header__inner container">
      <NuxtLink to="/" class="app-header__logo">
        Book<span class="app-header__logo-accent">Tech</span>
      </NuxtLink>

      <nav class="app-header__nav" :aria-label="$t('nav.browse')">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="app-header__nav-link"
          :class="{ 'app-header__nav-link--active': $route.path.startsWith(link.to) }"
        >
          {{ $t(link.label) }}
        </NuxtLink>
      </nav>

      <div class="app-header__actions">
        <button
          class="app-header__search-btn"
          :aria-label="$t('header.search')"
          @click="emit('open-search')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        <button
          class="app-header__wishlist-btn"
          :aria-label="$t('header.wishlist', { count: wishlist.count })"
          @click="navigateTo('/account/wishlist')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span v-if="wishlist.count > 0" class="app-header__badge">
            {{ wishlist.count }}
          </span>
        </button>

        <button
          class="app-header__cart-btn"
          :aria-label="$t('header.cart', { count: cart.itemCount })"
          @click="cart.openCart()"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span v-if="cart.itemCount > 0" class="app-header__badge app-header__badge--cart">
            {{ cart.itemCount }}
          </span>
        </button>

        <UiLanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'open-search': []
}>()

const cart = useCart()
const wishlist = useWishlist()

const navLinks = [
  { label: 'nav.browse', to: '/books' },
  { label: 'nav.categories', to: '/categories' },
  { label: 'nav.deals', to: '/books?badge=sale' },
  { label: 'nav.about', to: '/about' },
]

// Picsum placeholder photos — consistent per seed, always accessible from localhost
const bgImages = [
  'https://picsum.photos/seed/library1/1920/144',
  'https://picsum.photos/seed/books22/1920/144',
  'https://picsum.photos/seed/reading7/1920/144',
  'https://picsum.photos/seed/shelf55/1920/144',
]

const activeSlide = ref(0)
let slideTimer: ReturnType<typeof setInterval>

onMounted(() => {
  slideTimer = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % bgImages.length
  }, 5000)
})

onUnmounted(() => clearInterval(slideTimer))
</script>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: $z-sticky;
  height: $header-height;
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
  }

  &__bg-slide {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1.4s ease-in-out;

    &--active {
      opacity: 1;
    }
  }

  &__bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(8, 15, 35, 0.88) 0%,
      rgba(8, 15, 35, 0.65) 50%,
      rgba(8, 15, 35, 0.80) 100%
    );
  }

  &__inner {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: $space-5;
    height: 100%;
  }

  &__logo {
    font-family: $font-display;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-text-inverse;
    flex-shrink: 0;
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  }

  &__logo-accent {
    color: $cat-technology-mid;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: $space-4;
    flex: 1;
  }

  &__nav-link {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: rgba(255, 255, 255, 0.78);
    padding: $space-1 $space-2;
    border-radius: $radius-sm;
    transition: color $transition-base, background-color $transition-base;

    &:hover,
    &--active {
      color: $color-text-inverse;
      background-color: rgba(255, 255, 255, 0.14);
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-2;
    margin-left: auto;
  }

  &__search-btn,
  &__wishlist-btn,
  &__cart-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    background: rgba(255, 255, 255, 0.10);
    border-radius: $radius-md;
    color: rgba(255, 255, 255, 0.85);
    cursor: pointer;
    transition: background-color $transition-base, color $transition-base;

    &:hover {
      background-color: rgba(255, 255, 255, 0.22);
      color: $color-text-inverse;
    }
  }

  &__badge {
    position: absolute;
    top: 4px;
    right: 4px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    background-color: rgba(255, 255, 255, 0.92);
    color: $color-surface-dark;
    font-size: 10px;
    font-weight: $font-weight-bold;
    border-radius: $radius-full;
    display: flex;
    align-items: center;
    justify-content: center;

    &--cart {
      background-color: $cat-technology-mid;
      color: $color-text-inverse;
    }
  }
}
</style>
