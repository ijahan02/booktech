// app/types/book.types.ts

export type BookCategory =
  | 'technology'
  | 'science'
  | 'business'
  | 'fiction'
  | 'history'
  | 'design'
  | 'philosophy'
  | 'self-help'
  | 'travel'
  | 'cooking'

export type BookBadge = 'new' | 'bestseller' | 'sale' | 'staff-pick'

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest'

export interface Author {
  id: string
  name: string
  avatarUrl: string | null
  bio: string | null
}

export interface Book {
  id: string
  slug: string
  title: string
  subtitle: string | null
  author: Author
  category: BookCategory
  coverUrl: string
  description: string
  price: number
  salePrice: number | null
  rating: number
  reviewCount: number
  pageCount: number
  isbn: string
  publishedAt: string
  tags: readonly string[]
  badges: readonly BookBadge[]
  inStock: boolean
}

export interface BookFilters {
  category: BookCategory | null
  minPrice: number | null
  maxPrice: number | null
  minRating: number | null
  inStock: boolean
  sortBy: SortOption
}

export interface BooksResponse {
  books: Book[]
  total: number
  page: number
  perPage: number
}

export interface BookReview {
  id: string
  bookId: string
  userId: string
  userName: string
  userAvatarUrl: string | null
  rating: number
  title: string
  body: string
  createdAt: string
  helpful: number
}
