<template>
  <div class="wishlist-page">
    <div class="container">
      <h1 class="wishlist-page__title">My Wishlist</h1>

      <div v-if="wishlist.count === 0" class="wishlist-page__empty">
        <span aria-hidden="true">♡</span>
        <p>Your wishlist is empty.</p>
        <UiButton @click="navigateTo('/books')">Discover books →</UiButton>
      </div>

      <div v-else class="wishlist-page__grid">
        <BookCard
          v-for="book in wishlist.items"
          :key="book.id"
          :book="book"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Wishlist — BookTech' })

const wishlist = useWishlist()
</script>

<style lang="scss" scoped>
.wishlist-page {
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
    font-size: $font-size-4xl;
    color: $color-text-muted;

    p {
      font-size: $font-size-lg;
      color: $color-text-secondary;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $space-4;

    @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
    @media (max-width: 768px)  { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 480px)  { grid-template-columns: 1fr; }
  }
}
</style>
