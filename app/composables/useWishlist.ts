// app/composables/useWishlist.ts
import type { Book } from '~/types/book.types'

export const useWishlist = () => {
  const items = useState<Book[]>('wishlist:items', () => [])

  const isWishlisted = (bookId: string): boolean =>
    items.value.some((b) => b.id === bookId)

  const toggle = (book: Book): void => {
    if (isWishlisted(book.id)) {
      items.value = items.value.filter((b) => b.id !== book.id)
    } else {
      items.value.push(book)
    }
  }

  const remove = (bookId: string): void => {
    items.value = items.value.filter((b) => b.id !== bookId)
  }

  const count = computed<number>(() => items.value.length)

  return readonly({ items, count, isWishlisted, toggle, remove })
}
