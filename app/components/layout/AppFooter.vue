<template>
  <footer class="app-footer">
    <div class="app-footer__inner container">
      <div class="app-footer__brand">
        <span class="app-footer__logo">Book<span class="app-footer__logo-accent">Tech</span></span>
        <p class="app-footer__tagline">
          Your destination for great reads across every subject.
        </p>
        <div class="app-footer__social">
          <a href="#" class="app-footer__social-link" aria-label="Twitter">𝕏</a>
          <a href="#" class="app-footer__social-link" aria-label="Instagram">◈</a>
          <a href="#" class="app-footer__social-link" aria-label="RSS">◉</a>
        </div>
      </div>

      <nav class="app-footer__links" aria-label="Footer navigation">
        <div v-for="group in footerGroups" :key="group.title" class="app-footer__group">
          <h3 class="app-footer__group-title">{{ group.title }}</h3>
          <ul class="app-footer__group-list">
            <li v-for="link in group.links" :key="link.to">
              <NuxtLink :to="link.to" class="app-footer__link">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="app-footer__bottom">
      <div class="container">
        <p class="app-footer__copyright">© {{ currentYear }} BookTech. All rights reserved.</p>
        <div class="app-footer__legal">
          <NuxtLink to="/privacy" class="app-footer__link">Privacy</NuxtLink>
          <NuxtLink to="/terms" class="app-footer__link">Terms</NuxtLink>
          <NuxtLink to="/cookies" class="app-footer__link">Cookies</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const footerGroups = [
  {
    title: 'Browse',
    links: [
      { label: 'All Books', to: '/books' },
      { label: 'Categories', to: '/categories' },
      { label: 'New Arrivals', to: '/books?sort=newest' },
      { label: 'Bestsellers', to: '/books?badge=bestseller' },
      { label: 'On Sale', to: '/books?badge=sale' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'My Orders', to: '/account/orders' },
      { label: 'Wishlist', to: '/account/wishlist' },
      { label: 'Settings', to: '/account' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Blog', to: '/blog' },
    ],
  },
]
</script>

<style lang="scss" scoped>
.app-footer {
  background: linear-gradient(160deg, #0E1829 0%, #1A1210 60%, #0E1016 100%);
  color: $color-text-inverse;
  margin-top: $space-9;
  border-top: 3px solid $cat-technology-mid;

  &__inner {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: $space-8;
    padding-top: $space-8;
    padding-bottom: $space-7;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__brand {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__logo {
    font-family: $font-display;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    letter-spacing: -0.02em;
  }

  &__logo-accent {
    color: $cat-technology-mid;
  }

  &__tagline {
    font-size: $font-size-sm;
    color: rgba(255, 255, 255, 0.5);
    line-height: $line-height-base;
    max-width: 220px;
  }

  &__social {
    display: flex;
    gap: $space-2;
    margin-top: $space-1;
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: $radius-md;
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.6);
    font-size: $font-size-sm;
    transition: background-color $transition-base, color $transition-base;

    &:hover {
      background: rgba(74, 158, 255, 0.25);
      color: $cat-technology-mid;
    }
  }

  &__links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $space-5;
    padding-top: $space-2;

    @media (max-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__group-title {
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $cat-technology-mid;
    margin-bottom: $space-4;
  }

  &__group-list {
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__link {
    font-size: $font-size-sm;
    color: rgba(255, 255, 255, 0.55);
    transition: color $transition-base, padding-left $transition-base;

    &:hover {
      color: $color-text-inverse;
      padding-left: 4px;
    }
  }

  &__bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-block: $space-4;

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: $space-3;
    }
  }

  &__copyright {
    font-size: $font-size-xs;
    color: rgba(255, 255, 255, 0.35);
  }

  &__legal {
    display: flex;
    gap: $space-4;
  }
}
</style>
