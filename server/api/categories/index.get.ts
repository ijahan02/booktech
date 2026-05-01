// server/api/categories/index.get.ts
import type { CategoryMeta } from '~/types/cart.types'

export default defineEventHandler(async (): Promise<CategoryMeta[]> => {
  return [
    { slug: 'technology',  label: 'Technology',  description: 'Programming, AI, and software engineering.', icon: '💻', colors: { dark: '#1E3A5F', mid: '#4A9EFF', light: '#E8F3FF' }, bookCount: 1240 },
    { slug: 'science',     label: 'Science',     description: 'Biology, physics, and the natural world.',   icon: '🔬', colors: { dark: '#0D3B2E', mid: '#2ECC71', light: '#E8FBF3' }, bookCount: 890 },
    { slug: 'business',    label: 'Business',    description: 'Strategy, finance, and entrepreneurship.',   icon: '📈', colors: { dark: '#3B1F00', mid: '#F5A623', light: '#FFF8EC' }, bookCount: 760 },
    { slug: 'fiction',     label: 'Fiction',     description: 'Novels and literary works.',                 icon: '📖', colors: { dark: '#2D0A4E', mid: '#A855F7', light: '#F5EEFF' }, bookCount: 2100 },
    { slug: 'history',     label: 'History',     description: 'Ancient civilizations to modern events.',    icon: '🏛️', colors: { dark: '#3B2200', mid: '#C0874F', light: '#FFF5EB' }, bookCount: 540 },
    { slug: 'design',      label: 'Design',      description: 'Graphic design, UX/UI, and typography.',     icon: '🎨', colors: { dark: '#1A1A2E', mid: '#FF6B9D', light: '#FFF0F5' }, bookCount: 320 },
    { slug: 'philosophy',  label: 'Philosophy',  description: 'Ethics, logic, and great thinkers.',         icon: '🧠', colors: { dark: '#1C2340', mid: '#64748B', light: '#F1F5F9' }, bookCount: 280 },
    { slug: 'self-help',   label: 'Self-Help',   description: 'Personal growth and peak performance.',      icon: '🌱', colors: { dark: '#003D2E', mid: '#10B981', light: '#ECFDF5' }, bookCount: 670 },
    { slug: 'travel',      label: 'Travel',      description: 'Guides and stories from around the globe.',  icon: '✈️', colors: { dark: '#1A3A4A', mid: '#38BDF8', light: '#F0F9FF' }, bookCount: 410 },
    { slug: 'cooking',     label: 'Cooking',     description: 'Recipes and culinary traditions.',           icon: '🍳', colors: { dark: '#3B0A00', mid: '#EF4444', light: '#FFF5F5' }, bookCount: 380 },
  ]
})
