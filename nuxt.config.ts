export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', flag: '🇬🇧', file: 'en.ts' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', flag: '🇷🇺', file: 'ru.ts' },
      { code: 'tk', language: 'tk-TM', name: 'Türkmen', flag: '🇹🇲', file: 'tk.ts' },
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    strategy: 'no_prefix',
  },

  googleFonts: {
    families: {
      'Playfair+Display': [400, 500, 600, 700],
      'DM+Sans': [300, 400, 500],
      'JetBrains+Mono': [400, 500],
    },
    display: 'swap',
  },

  css: ['~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/tokens" as *;
            @use "~/assets/scss/typography" as *;
            @use "~/assets/scss/spacing" as *;
            @use "~/assets/scss/categories" as *;
          `,
        },
      },
    },
  },

  image: {
    quality: 85,
    format: ['webp'],
  },

  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    meilisearchAdminKey: process.env.MEILISEARCH_ADMIN_KEY,
    databaseUrl: process.env.DATABASE_URL,
    authSecret: process.env.AUTH_SECRET,
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
      stripeKey: process.env.NUXT_PUBLIC_STRIPE_KEY,
      meilisearchHost: process.env.NUXT_PUBLIC_MEILISEARCH_HOST,
      meilisearchKey: process.env.NUXT_PUBLIC_MEILISEARCH_KEY,
      cloudflareUrl: process.env.NUXT_PUBLIC_CLOUDFLARE_URL,
    },
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },
})
