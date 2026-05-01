// app/composables/useCart.ts
import type { Book } from '~/types/book.types'
import type { CartItem } from '~/types/cart.types'

export const useCart = () => {
  const items = useState<CartItem[]>('cart:items', () => [])
  const isOpen = useState<boolean>('cart:open', () => false)

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

  const findItem = (bookId: string): CartItem | undefined =>
    items.value.find((i) => i.book.id === bookId)

  const addItem = (book: Book, quantity: number = 1): void => {
    const existing = findItem(book.id)
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
    if (quantity <= 0) {
      removeItem(bookId)
      return
    }
    const item = findItem(bookId)
    if (item) item.quantity = quantity
  }

  const clearCart = (): void => {
    items.value = []
  }

  const openCart = (): void => { isOpen.value = true }
  const closeCart = (): void => { isOpen.value = false }
  const toggleCart = (): void => { isOpen.value = !isOpen.value }

  return readonly({
    items,
    isOpen,
    itemCount,
    subtotal,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  })
}
