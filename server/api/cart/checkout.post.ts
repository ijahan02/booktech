// server/api/cart/checkout.post.ts
import type { CartItem } from '~/types/cart.types'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{ items: CartItem[] }>(event)

  if (!body.items || body.items.length === 0) {
    throw createError({ statusCode: 400, message: 'Cart is empty' })
  }

  // Stripe integration — uncomment when STRIPE_SECRET_KEY is set
  // const stripe = new Stripe(config.stripeSecretKey)
  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: ['card'],
  //   mode: 'payment',
  //   line_items: body.items.map((item) => ({
  //     price_data: {
  //       currency: 'usd',
  //       product_data: { name: item.book.title, images: [item.book.coverUrl] },
  //       unit_amount: Math.round((item.book.salePrice ?? item.book.price) * 100),
  //     },
  //     quantity: item.quantity,
  //   })),
  //   success_url: `${config.public.siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  //   cancel_url: `${config.public.siteUrl}/cart`,
  // })
  // return { url: session.url, sessionId: session.id }

  // Mock response for development
  return {
    url: `${config.public.siteUrl}/checkout/success?session_id=mock_session`,
    sessionId: 'mock_session',
  }
})
