// app/stores/cart.store.ts
import { defineStore } from 'pinia'
import type { Book } from '~/types/book.types'
import type { CartItem } from '~/types/cart.types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isOpen = ref<boolean>(false)

  const itemCount = computed<number>(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const subtotal = computed<number>(() =>
    items.value.reduce((sum, item) => {
      const price = item.book.salePrice ?? item.book.price
      return sum + price * item.quantity
    }, 0)
  )

  const isEmpty = computed<boolean>(() => items.value.length === 0)

  const addItem = (book: Book, quantity: number = 1): void => {
    const existing = items.value.find((i) => i.book.id === book.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ book, quantity })
    }
    isOpen.value = true
  }

  const removeItem = (bookId: string): void => {
    const index = items.value.findIndex((i) => i.book.id === bookId)
    if (index !== -1) items.value.splice(index, 1)
  }

  const updateQuantity = (bookId: string, quantity: number): void => {
    if (quantity <= 0) { removeItem(bookId); return }
    const item = items.value.find((i) => i.book.id === bookId)
    if (item) item.quantity = quantity
  }

  const clearCart = (): void => { items.value = [] }

  return { items: readonly(items), isOpen, itemCount, subtotal, isEmpty, addItem, removeItem, updateQuantity, clearCart }
})
