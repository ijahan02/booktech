<template>
  <section class="app-banner" aria-label="Promotional banners">
    <div class="app-banner__track">
      <div
        v-for="(slide, i) in slides"
        :key="i"
        class="app-banner__slide"
        :class="{ 'app-banner__slide--active': i === active }"
        :style="{ background: slide.gradient }"
      >
        <div class="container app-banner__content">
          <span class="app-banner__tag">{{ slide.tag }}</span>
          <h2 class="app-banner__title">{{ slide.title }}</h2>
          <p class="app-banner__sub">{{ slide.sub }}</p>
          <NuxtLink :to="slide.to" class="app-banner__cta">
            {{ slide.cta }} <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
        <div class="app-banner__deco" aria-hidden="true">{{ slide.deco }}</div>
      </div>
    </div>

    <button class="app-banner__arrow app-banner__arrow--prev" aria-label="Previous slide" @click="prev">‹</button>
    <button class="app-banner__arrow app-banner__arrow--next" aria-label="Next slide" @click="next">›</button>

    <div class="app-banner__dots" role="tablist" aria-label="Slides">
      <button
        v-for="(_, i) in slides"
        :key="i"
        role="tab"
        class="app-banner__dot"
        :class="{ 'app-banner__dot--active': i === active }"
        :aria-selected="i === active"
        :aria-label="`Slide ${i + 1}`"
        @click="goTo(i)"
      />
    </div>

    <div class="app-banner__progress">
      <div class="app-banner__progress-bar" :style="{ width: progressPct + '%' }" />
    </div>
  </section>
</template>

<script setup lang="ts">
const slides = [
  {
    tag: 'Welcome to BookTech',
    title: 'Find Your Next Great Read',
    sub: 'Thousands of titles across technology, science, fiction, and more — all in one place.',
    cta: 'Browse All Books',
    to: '/books',
    gradient: 'linear-gradient(135deg, #0D2550 0%, #1D5099 55%, #2A6BBF 100%)',
    deco: '📚',
  },
  {
    tag: 'Limited Time',
    title: 'Summer Sale — Up to 40% Off',
    sub: 'Hand-picked deals on bestsellers, new arrivals, and hidden gems.',
    cta: 'Shop the Sale',
    to: '/books?badge=sale',
    gradient: 'linear-gradient(135deg, #5C2200 0%, #994400 55%, #C25A00 100%)',
    deco: '🎁',
  },
  {
    tag: 'New This Month',
    title: 'Fresh Arrivals Worth Reading',
    sub: 'The latest releases in science, fiction, self-help, travel, and more.',
    cta: 'See New Books',
    to: '/books?sort=newest',
    gradient: 'linear-gradient(135deg, #093325 0%, #166640 55%, #1E8050 100%)',
    deco: '✨',
  },
  {
    tag: 'Staff Picks',
    title: "Books Our Team Can't Stop Talking About",
    sub: 'Curated recommendations from our passionate readers and editors.',
    cta: 'Explore Picks',
    to: '/books?badge=staff-pick',
    gradient: 'linear-gradient(135deg, #250A45 0%, #55158C 55%, #6E20A8 100%)',
    deco: '⭐',
  },
]

const INTERVAL = 5000
const active = ref(0)
const progressPct = ref(0)

let slideTimer: ReturnType<typeof setInterval>
let progressTimer: ReturnType<typeof setInterval>

function goTo(i: number) {
  active.value = i
  resetTimers()
}

function next() {
  active.value = (active.value + 1) % slides.length
  resetTimers()
}

function prev() {
  active.value = (active.value - 1 + slides.length) % slides.length
  resetTimers()
}

function startTimers() {
  progressPct.value = 0
  const startTime = Date.now()
  progressTimer = setInterval(() => {
    progressPct.value = Math.min(((Date.now() - startTime) / INTERVAL) * 100, 100)
  }, 40)
  slideTimer = setInterval(() => {
    active.value = (active.value + 1) % slides.length
    resetTimers()
  }, INTERVAL)
}

function resetTimers() {
  clearInterval(slideTimer)
  clearInterval(progressTimer)
  startTimers()
}

onMounted(startTimers)
onUnmounted(() => {
  clearInterval(slideTimer)
  clearInterval(progressTimer)
})
</script>

<style lang="scss" scoped>
.app-banner {
  position: relative;
  height: 340px;
  overflow: hidden;
  user-select: none;

  &__track {
    position: relative;
    height: 100%;
  }

  &__slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.9s ease;
    display: flex;
    align-items: center;

    &--active {
      opacity: 1;
    }
  }

  &__content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: $space-3;
    max-width: 560px;
  }

  &__tag {
    display: inline-block;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.65);
    background: rgba(255, 255, 255, 0.10);
    padding: 4px $space-3;
    border-radius: $radius-full;
    width: fit-content;
  }

  &__title {
    font-family: $font-display;
    font-size: $font-size-4xl;
    font-weight: $font-weight-bold;
    color: $color-text-inverse;
    line-height: 1.15;
    letter-spacing: -0.02em;

    @media (max-width: 600px) {
      font-size: $font-size-2xl;
    }
  }

  &__sub {
    font-size: $font-size-base;
    color: rgba(255, 255, 255, 0.70);
    line-height: $line-height-base;
    max-width: 440px;
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    margin-top: $space-1;
    padding: $space-3 $space-5;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.30);
    border-radius: $radius-full;
    color: $color-text-inverse;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    backdrop-filter: blur(8px);
    transition: background-color $transition-base, border-color $transition-base;
    width: fit-content;

    &:hover {
      background: rgba(255, 255, 255, 0.28);
      border-color: rgba(255, 255, 255, 0.55);
    }
  }

  &__deco {
    position: absolute;
    right: 8%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10rem;
    opacity: 0.15;
    pointer-events: none;
    line-height: 1;

    @media (max-width: 768px) {
      font-size: 6rem;
      opacity: 0.10;
    }
  }

  // Arrow buttons
  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    width: 44px;
    height: 44px;
    border-radius: $radius-full;
    border: 1px solid rgba(255, 255, 255, 0.25);
    background: rgba(0, 0, 0, 0.25);
    color: $color-text-inverse;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(6px);
    transition: background-color $transition-base, border-color $transition-base;

    &:hover {
      background: rgba(0, 0, 0, 0.45);
      border-color: rgba(255, 255, 255, 0.50);
    }

    &--prev { left: $space-4; }
    &--next { right: $space-4; }

    @media (max-width: 480px) {
      display: none;
    }
  }

  // Dot navigation
  &__dots {
    position: absolute;
    bottom: $space-4;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: $space-2;
    z-index: 3;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: $radius-full;
    border: none;
    background: rgba(255, 255, 255, 0.35);
    cursor: pointer;
    transition: background-color $transition-base, width $transition-base;
    padding: 0;

    &--active {
      width: 24px;
      background: $color-text-inverse;
    }
  }

  // Progress bar
  &__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: rgba(255, 255, 255, 0.10);
    z-index: 3;
  }

  &__progress-bar {
    height: 100%;
    background: rgba(255, 255, 255, 0.55);
    transition: width 40ms linear;
  }
}
</style>
