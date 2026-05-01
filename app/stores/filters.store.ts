// app/stores/filters.store.ts
import { defineStore } from 'pinia'
import type { BookFilters } from '~/types/book.types'

const DEFAULT: BookFilters = {
  category: null, minPrice: null, maxPrice: null,
  minRating: null, inStock: false, sortBy: 'relevance',
}

export const useFiltersStore = defineStore('filters', () => {
  const filters = ref<BookFilters>({ ...DEFAULT })
  const page = ref<number>(1)

  const setFilter = <K extends keyof BookFilters>(key: K, value: BookFilters[K]): void => {
    filters.value[key] = value
    page.value = 1
  }

  const reset = (): void => {
    filters.value = { ...DEFAULT }
    page.value = 1
  }

  return { filters: readonly(filters), page, setFilter, reset }
})
