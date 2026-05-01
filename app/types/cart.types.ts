// app/types/cart.types.ts
import type { Book } from './book.types'

export interface CartItem {
  book: Book
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

export interface CheckoutSession {
  url: string
  sessionId: string
}

// app/types/category.types.ts
export interface CategoryColors {
  dark: string
  mid: string
  light: string
}

export interface CategoryMeta {
  slug: string
  label: string
  description: string
  icon: string
  colors: CategoryColors
  bookCount?: number
}
