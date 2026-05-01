<template>
  <div ref="el" class="lang-switcher">
    <button
      class="lang-switcher__trigger"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-label="$t('header.switchLanguage')"
      @click="open = !open"
    >
      <span aria-hidden="true">{{ current?.flag }}</span>
      <span class="lang-switcher__code">{{ locale.toUpperCase() }}</span>
      <svg
        class="lang-switcher__chevron"
        :class="{ 'lang-switcher__chevron--open': open }"
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <Transition name="lang-dropdown">
      <ul
        v-if="open"
        class="lang-switcher__dropdown"
        role="listbox"
        :aria-label="$t('header.switchLanguage')"
      >
        <li
          v-for="loc in locales"
          :key="loc.code"
          role="option"
          :aria-selected="loc.code === locale"
        >
          <button
            class="lang-switcher__option"
            :class="{ 'lang-switcher__option--active': loc.code === locale }"
            @click="select(loc.code)"
          >
            <span aria-hidden="true">{{ loc.flag }}</span>
            <span class="lang-switcher__option-name">{{ loc.name }}</span>
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const el = ref<HTMLElement | null>(null)
const open = ref(false)

const current = computed(() =>
  (locales.value as Array<{ code: string; name: string; flag: string }>).find(
    l => l.code === locale.value,
  ),
)

async function select(code: string) {
  await setLocale(code as Parameters<typeof setLocale>[0])
  open.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (el.value && !el.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => window.addEventListener('click', handleClickOutside, true))
onUnmounted(() => window.removeEventListener('click', handleClickOutside, true))
</script>

<style lang="scss" scoped>
.lang-switcher {
  position: relative;

  &__trigger {
    display: flex;
    align-items: center;
    gap: $space-1;
    height: 40px;
    padding: 0 $space-2;
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: $radius-sm;
    background: rgba(255, 255, 255, 0.10);
    color: rgba(255, 255, 255, 0.85);
    cursor: pointer;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    letter-spacing: 0.04em;
    transition: background-color $transition-base, color $transition-base, border-color $transition-base;

    &:hover {
      background-color: rgba(255, 255, 255, 0.20);
      border-color: rgba(255, 255, 255, 0.45);
      color: $color-text-inverse;
    }

    &[aria-expanded='true'] {
      background-color: rgba(255, 255, 255, 0.20);
      border-color: $cat-technology-mid;
      color: $color-text-inverse;
    }
  }

  &__code {
    font-family: $font-mono;
    font-size: $font-size-xs;
  }

  &__chevron {
    margin-left: 2px;
    transition: transform $transition-base;
    color: rgba(255, 255, 255, 0.55);

    &--open {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + $space-1);
    right: 0;
    min-width: 148px;
    background-color: $color-surface;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    box-shadow: $shadow-modal;
    overflow: hidden;
    z-index: $z-dropdown;
    padding: $space-1;
  }

  &__option {
    display: flex;
    align-items: center;
    gap: $space-2;
    width: 100%;
    padding: $space-2 $space-3;
    border: none;
    border-radius: $radius-sm;
    background: transparent;
    color: $color-text-secondary;
    font-size: $font-size-sm;
    cursor: pointer;
    text-align: left;
    transition: background-color $transition-base, color $transition-base;

    &:hover {
      background-color: $color-surface-alt;
      color: $color-text-primary;
    }

    &--active {
      background-color: rgba($cat-technology-mid, 0.08);
      color: $cat-technology-dark;
      font-weight: $font-weight-medium;

      &::after {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        border-radius: $radius-full;
        background-color: $cat-technology-mid;
        margin-left: auto;
        flex-shrink: 0;
      }
    }
  }

  &__option-name {
    flex: 1;
  }
}

// Dropdown enter/leave transition
.lang-dropdown-enter-active,
.lang-dropdown-leave-active {
  transition: opacity $transition-base, transform $transition-base;
}

.lang-dropdown-enter-from,
.lang-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}
</style>
