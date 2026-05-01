<template>
  <div class="categories-page">
    <div class="container">
      <div class="categories-page__header">
        <h1 class="categories-page__title">Browse Categories</h1>
        <p class="categories-page__subtitle">
          Explore our curated collection across {{ categories.all.length }} categories
        </p>
      </div>
      <div class="categories-page__grid">
        <CategoryCard
          v-for="cat in categories.all"
          :key="cat.slug"
          :category="cat"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Categories — BookTech',
  description: 'Browse books by category: technology, science, business, fiction, and more.',
})

const categories = useCategories()
</script>

<style lang="scss" scoped>
.categories-page {
  padding-block: $space-8;

  &__header {
    margin-bottom: $space-7;
  }

  &__title {
    font-family: $font-display;
    font-size: $font-size-4xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    margin-bottom: $space-3;
  }

  &__subtitle {
    font-size: $font-size-lg;
    color: $color-text-secondary;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: $space-4;

    @media (max-width: 1200px) { grid-template-columns: repeat(4, 1fr); }
    @media (max-width: 900px)  { grid-template-columns: repeat(3, 1fr); }
    @media (max-width: 600px)  { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 400px)  { grid-template-columns: 1fr; }
  }
}
</style>
