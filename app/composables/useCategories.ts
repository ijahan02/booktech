// app/composables/useCategories.ts
import type { BookCategory } from '~/types/book.types'
import type { CategoryColors, CategoryMeta } from '~/types/cart.types'

const CATEGORY_MAP: Record<BookCategory, CategoryMeta> = {
  technology: {
    slug: 'technology',
    label: 'Technology',
    description: 'Programming, software engineering, AI, and the tools shaping tomorrow.',
    icon: '💻',
    colors: { dark: '#1D5099', mid: '#4A9EFF', light: '#E8F3FF' },
  },
  science: {
    slug: 'science',
    label: 'Science',
    description: 'Biology, physics, chemistry, and the wonders of the natural world.',
    icon: '🔬',
    colors: { dark: '#166640', mid: '#2ECC71', light: '#E8FBF3' },
  },
  business: {
    slug: 'business',
    label: 'Business',
    description: 'Strategy, entrepreneurship, finance, and leadership principles.',
    icon: '📈',
    colors: { dark: '#994400', mid: '#F5A623', light: '#FFF8EC' },
  },
  fiction: {
    slug: 'fiction',
    label: 'Fiction',
    description: 'Novels, short stories, and literary works across every genre.',
    icon: '📖',
    colors: { dark: '#55158C', mid: '#A855F7', light: '#F5EEFF' },
  },
  history: {
    slug: 'history',
    label: 'History',
    description: 'Ancient civilizations, modern events, and everything in between.',
    icon: '🏛️',
    colors: { dark: '#7A3E0A', mid: '#C0874F', light: '#FFF5EB' },
  },
  design: {
    slug: 'design',
    label: 'Design',
    description: 'Graphic design, UX/UI, typography, and visual thinking.',
    icon: '🎨',
    colors: { dark: '#991555', mid: '#FF6B9D', light: '#FFF0F5' },
  },
  philosophy: {
    slug: 'philosophy',
    label: 'Philosophy',
    description: 'Ethics, logic, metaphysics, and the great thinkers of all time.',
    icon: '🧠',
    colors: { dark: '#2D3F77', mid: '#64748B', light: '#F1F5F9' },
  },
  'self-help': {
    slug: 'self-help',
    label: 'Self-Help',
    description: 'Personal growth, habits, mindfulness, and peak performance.',
    icon: '🌱',
    colors: { dark: '#0D7755', mid: '#10B981', light: '#ECFDF5' },
  },
  travel: {
    slug: 'travel',
    label: 'Travel',
    description: 'Guides, memoirs, and stories from every corner of the globe.',
    icon: '✈️',
    colors: { dark: '#165577', mid: '#38BDF8', light: '#F0F9FF' },
  },
  cooking: {
    slug: 'cooking',
    label: 'Cooking',
    description: 'Recipes, techniques, and culinary traditions from world cuisines.',
    icon: '🍳',
    colors: { dark: '#881A10', mid: '#EF4444', light: '#FFF5F5' },
  },
}

export const useCategories = () => {
  const all = computed<CategoryMeta[]>(() => Object.values(CATEGORY_MAP))

  const getColors = (category: BookCategory): CategoryColors =>
    CATEGORY_MAP[category].colors

  const getMeta = (category: BookCategory): CategoryMeta =>
    CATEGORY_MAP[category]

  const getCssVars = (category: BookCategory): Record<string, string> => {
    const { dark, mid, light } = getColors(category)
    return {
      '--cat-dark': dark,
      '--cat-mid': mid,
      '--cat-light': light,
    }
  }

  return readonly({ all, getColors, getMeta, getCssVars, CATEGORY_MAP })
}
