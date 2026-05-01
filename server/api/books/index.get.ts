// server/api/books/index.get.ts
import type { Book, BookCategory, BooksResponse, SortOption } from '~/types/book.types'

// Mock data - replace with Drizzle ORM queries in production
const MOCK_BOOKS: Book[] = [
  {
    id: '1', slug: 'clean-code',
    title: 'Clean Code', subtitle: 'A Handbook of Agile Software Craftsmanship',
    author: { id: 'a1', name: 'Robert C. Martin', avatarUrl: null, bio: null },
    category: 'technology', coverUrl: 'https://covers.openlibrary.org/b/id/8314081-L.jpg',
    description: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees.',
    price: 39.99, salePrice: null, rating: 4.7, reviewCount: 2341, pageCount: 431,
    isbn: '9780132350884', publishedAt: '2008-08-01', tags: ['programming', 'software'], badges: ['bestseller'], inStock: true,
  },
  {
    id: '2', slug: 'pragmatic-programmer',
    title: 'The Pragmatic Programmer', subtitle: 'Your Journey to Mastery',
    author: { id: 'a2', name: 'David Thomas & Andrew Hunt', avatarUrl: null, bio: null },
    category: 'technology', coverUrl: 'https://covers.openlibrary.org/b/id/8395463-L.jpg',
    description: 'Straight from the programming trenches, The Pragmatic Programmer cuts through the increasing specialization and technicalities of modern software development.',
    price: 49.99, salePrice: 34.99, rating: 4.8, reviewCount: 1820, pageCount: 352,
    isbn: '9780135957059', publishedAt: '2019-09-13', tags: ['programming'], badges: ['new', 'sale'], inStock: true,
  },
  {
    id: '3', slug: 'designing-data-intensive-applications',
    title: 'Designing Data-Intensive Applications', subtitle: null,
    author: { id: 'a3', name: 'Martin Kleppmann', avatarUrl: null, bio: null },
    category: 'technology', coverUrl: 'https://covers.openlibrary.org/b/id/8226162-L.jpg',
    description: 'Data is at the center of many challenges in system design today. This book examines the pros and cons of various technologies for processing and storing data.',
    price: 59.99, salePrice: null, rating: 4.9, reviewCount: 3102, pageCount: 616,
    isbn: '9781449373320', publishedAt: '2017-03-16', tags: ['databases', 'systems'], badges: ['staff-pick'], inStock: true,
  },
  {
    id: '4', slug: 'sapiens',
    title: 'Sapiens', subtitle: 'A Brief History of Humankind',
    author: { id: 'a4', name: 'Yuval Noah Harari', avatarUrl: null, bio: null },
    category: 'history', coverUrl: 'https://covers.openlibrary.org/b/id/8739161-L.jpg',
    description: 'One hundred thousand years ago, at least six human species inhabited the earth. Today there is just one: us.',
    price: 18.99, salePrice: 14.99, rating: 4.6, reviewCount: 8910, pageCount: 443,
    isbn: '9780062316097', publishedAt: '2015-02-10', tags: ['history', 'anthropology'], badges: ['bestseller', 'sale'], inStock: true,
  },
  {
    id: '5', slug: 'atomic-habits',
    title: 'Atomic Habits', subtitle: 'An Easy and Proven Way to Build Good Habits',
    author: { id: 'a5', name: 'James Clear', avatarUrl: null, bio: null },
    category: 'self-help', coverUrl: 'https://covers.openlibrary.org/b/id/8749476-L.jpg',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving—every day.',
    price: 16.99, salePrice: null, rating: 4.8, reviewCount: 12400, pageCount: 320,
    isbn: '9780735211292', publishedAt: '2018-10-16', tags: ['habits', 'productivity'], badges: ['bestseller'], inStock: true,
  },
  {
    id: '6', slug: 'the-design-of-everyday-things',
    title: 'The Design of Everyday Things', subtitle: null,
    author: { id: 'a6', name: 'Don Norman', avatarUrl: null, bio: null },
    category: 'design', coverUrl: 'https://covers.openlibrary.org/b/id/7930292-L.jpg',
    description: 'A powerful primer on how—and why—some products satisfy customers while others only frustrate them.',
    price: 22.99, salePrice: null, rating: 4.5, reviewCount: 4301, pageCount: 368,
    isbn: '9780465050659', publishedAt: '2013-11-05', tags: ['design', 'ux'], badges: ['staff-pick'], inStock: true,
  },
  {
    id: '7', slug: 'thinking-fast-and-slow',
    title: 'Thinking, Fast and Slow', subtitle: null,
    author: { id: 'a7', name: 'Daniel Kahneman', avatarUrl: null, bio: null },
    category: 'science', coverUrl: 'https://covers.openlibrary.org/b/id/8171310-L.jpg',
    description: 'In the highly anticipated Thinking, Fast and Slow, Kahneman takes us on a groundbreaking tour of the mind.',
    price: 17.99, salePrice: null, rating: 4.6, reviewCount: 7200, pageCount: 499,
    isbn: '9780374533557', publishedAt: '2013-04-02', tags: ['psychology', 'economics'], badges: [], inStock: true,
  },
  {
    id: '8', slug: 'zero-to-one',
    title: 'Zero to One', subtitle: 'Notes on Startups, or How to Build the Future',
    author: { id: 'a8', name: 'Peter Thiel', avatarUrl: null, bio: null },
    category: 'business', coverUrl: 'https://covers.openlibrary.org/b/id/8219895-L.jpg',
    description: 'The next Bill Gates will not build an operating system. The next Larry Page or Sergey Brin won\'t make a search engine.',
    price: 19.99, salePrice: 15.99, rating: 4.3, reviewCount: 5600, pageCount: 224,
    isbn: '9780804139021', publishedAt: '2014-09-16', tags: ['startups', 'entrepreneurship'], badges: ['sale'], inStock: true,
  },
]

export default defineEventHandler(async (event): Promise<BooksResponse> => {
  const query = getQuery(event)

  const category = query.category as BookCategory | undefined
  const sortBy = (query.sortBy as SortOption) ?? 'relevance'
  const page = Number(query.page ?? 1)
  const perPage = Number(query.perPage ?? 12)
  const inStock = query.inStock === 'true'
  const minRating = query.minRating ? Number(query.minRating) : null
  const minPrice = query.minPrice ? Number(query.minPrice) : null
  const maxPrice = query.maxPrice ? Number(query.maxPrice) : null

  let filtered = [...MOCK_BOOKS]

  if (category) filtered = filtered.filter((b) => b.category === category)
  if (inStock) filtered = filtered.filter((b) => b.inStock)
  if (minRating !== null) filtered = filtered.filter((b) => b.rating >= minRating)
  if (minPrice !== null) filtered = filtered.filter((b) => (b.salePrice ?? b.price) >= minPrice)
  if (maxPrice !== null) filtered = filtered.filter((b) => (b.salePrice ?? b.price) <= maxPrice)

  const sorted = filtered.sort((a, b) => {
    if (sortBy === 'rating')     return b.rating - a.rating
    if (sortBy === 'newest')     return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    if (sortBy === 'price-asc')  return (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
    if (sortBy === 'price-desc') return (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
    return 0
  })

  const total = sorted.length
  const start = (page - 1) * perPage
  const books = sorted.slice(start, start + perPage)

  return { books, total, page, perPage }
})
