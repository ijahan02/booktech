// app/composables/useBooks.ts
import type { Book, BookFilters, BooksResponse, BookCategory } from '~/types/book.types'

const DEFAULT_FILTERS: BookFilters = {
  category: null,
  minPrice: null,
  maxPrice: null,
  minRating: null,
  inStock: false,
  sortBy: 'relevance',
}

export const useBooks = () => {
  const filters = useState<BookFilters>('books:filters', () => ({ ...DEFAULT_FILTERS }))
  const page = useState<number>('books:page', () => 1)

  const queryParams = computed(() => {
    const params: Record<string, string | number | boolean> = {
      page: page.value,
      perPage: 12,
      sortBy: filters.value.sortBy,
    }
    if (filters.value.category) params.category = filters.value.category
    if (filters.value.minPrice !== null) params.minPrice = filters.value.minPrice
    if (filters.value.maxPrice !== null) params.maxPrice = filters.value.maxPrice
    if (filters.value.minRating !== null) params.minRating = filters.value.minRating
    if (filters.value.inStock) params.inStock = true
    return params
  })

  const { data, error, status, refresh } = useFetch<BooksResponse>('/api/books', {
    query: queryParams,
    watch: [queryParams],
  })

  if (error.value) {
    console.error('[useBooks] fetch error:', error.value.message)
  }

  const setCategory = (category: BookCategory | null): void => {
    filters.value.category = category
    page.value = 1
  }

  const setFilter = <K extends keyof BookFilters>(key: K, value: BookFilters[K]): void => {
    filters.value[key] = value
    page.value = 1
  }

  const resetFilters = (): void => {
    filters.value = { ...DEFAULT_FILTERS }
    page.value = 1
  }

  const goToPage = (newPage: number): void => {
    page.value = newPage
  }

  const books = computed<Book[]>(() => data.value?.books ?? [])
  const total = computed<number>(() => data.value?.total ?? 0)
  const totalPages = computed<number>(() =>
    Math.ceil(total.value / 12)
  )
  const isLoading = computed<boolean>(() => status.value === 'pending')

  return readonly({
    books,
    total,
    totalPages,
    isLoading,
    filters,
    page,
    error,
    setCategory,
    setFilter,
    resetFilters,
    goToPage,
    refresh,
  })
}
