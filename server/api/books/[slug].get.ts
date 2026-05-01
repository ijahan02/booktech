// server/api/books/[slug].get.ts
import type { Book } from '~/types/book.types'

const MOCK_BOOKS: Record<string, Book> = {
  'clean-code': {
    id: '1', slug: 'clean-code',
    title: 'Clean Code', subtitle: 'A Handbook of Agile Software Craftsmanship',
    author: { id: 'a1', name: 'Robert C. Martin', avatarUrl: null, bio: 'Robert C. Martin, known as "Uncle Bob", is a software engineer and instructor.' },
    category: 'technology', coverUrl: 'https://covers.openlibrary.org/b/id/8314081-L.jpg',
    description: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn\'t have to be that way. Noted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship. Martin has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code "on the fly" into a book that will instill within you the values of a software craftsman and make you a better programmer.',
    price: 39.99, salePrice: null, rating: 4.7, reviewCount: 2341, pageCount: 431,
    isbn: '9780132350884', publishedAt: '2008-08-01', tags: ['programming', 'software', 'agile'], badges: ['bestseller'], inStock: true,
  },
  'atomic-habits': {
    id: '5', slug: 'atomic-habits',
    title: 'Atomic Habits', subtitle: 'An Easy and Proven Way to Build Good Habits & Break Bad Ones',
    author: { id: 'a5', name: 'James Clear', avatarUrl: null, bio: 'James Clear is a writer and speaker focused on habits, decision making, and continuous improvement.' },
    category: 'self-help', coverUrl: 'https://covers.openlibrary.org/b/id/8749476-L.jpg',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    price: 16.99, salePrice: null, rating: 4.8, reviewCount: 12400, pageCount: 320,
    isbn: '9780735211292', publishedAt: '2018-10-16', tags: ['habits', 'productivity', 'psychology'], badges: ['bestseller'], inStock: true,
  },
}

export default defineEventHandler(async (event): Promise<Book> => {
  const slug = getRouterParam(event, 'slug')

  if (!slug || !MOCK_BOOKS[slug]) {
    throw createError({ statusCode: 404, message: `Book not found: ${slug}` })
  }

  return MOCK_BOOKS[slug]
})
