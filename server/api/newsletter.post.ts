// server/api/newsletter.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string }>(event)

  if (!body.email || !body.email.includes('@')) {
    throw createError({ statusCode: 400, message: 'Invalid email address' })
  }

  // TODO: integrate with Mailchimp / Resend / similar
  console.info('[Newsletter] New subscriber:', body.email)

  return { success: true, message: 'Subscribed successfully' }
})
