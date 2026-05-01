<template>
  <div class="default-layout">
    <AppHeader @open-search="searchOpen = true" />
    <AppBanner />
    <main class="default-layout__main">
      <slot />
    </main>
    <AppFooter />
    <CartDrawer />
  </div>
</template>

<script setup lang="ts">
const searchOpen = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__main {
    flex: 1;
  }
}
</style>
