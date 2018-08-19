const config = {
  envs: {
    dev: {
      TITLE: 'DEV',
      BASE_URL: 'https://umbrella-dev.yojee.com',
      CHAT_ENV: 'dev',
      SENTRY_LINK:
        'https://e07b04713767462fa002de1efa27d817:e2e9b02bcb7c4322bda4b3aa491d4e42@sentry.io/304124'
    },
    staging: {
      TITLE: 'STAGING',
      BASE_URL: 'https://umbrella-staging.yojee.com',
      CHAT_ENV: 'staging',
      SENTRY_LINK:
        'https://e07b04713767462fa002de1efa27d817:e2e9b02bcb7c4322bda4b3aa491d4e42@sentry.io/304124'
    },
    demo: {
      TITLE: 'DEMO-SANDBOX',
      BASE_URL: 'https://umbrella-demo.yojee.com',
      CHAT_ENV: 'demo',
      SENTRY_LINK:
        'https://e07b04713767462fa002de1efa27d817:e2e9b02bcb7c4322bda4b3aa491d4e42@sentry.io/304124'
    },
    prod: {
      TITLE: 'LIVE',
      BASE_URL: 'https://umbrella-live.yojee.com',
      CHAT_ENV: 'live',
      SENTRY_LINK:
        'https://2c73fc7de2264f8ea8fda4748c5b4e54:a9e7172a0dc8479aafb393d939f73c39@sentry.io/304125'
    }
  },
  brands: {
    yojee_default: {
      TITLE: 'Yojee Default',
      COMPANY_SLUG: 'yojee',
      THEME: 'yojee',
      SHOW_SERVICE_TYPE: 1,
      DEFAULT_LANG: 'en'
    },
    ups: {
      TITLE: 'Ups',
      COMPANY_SLUG: 'ups',
      THEME: 'ups',
      SHOW_SERVICE_TYPE: 1,
      DEFAULT_LANG: 'en'
    },
    tasman: {
      TITLE: 'Tasman',
      COMPANY_SLUG: 'tasman',
      THEME: 'tasman',
      SHOW_SERVICE_TYPE: 1,
      DEFAULT_LANG: 'en'
    },
    scharff: {
      TITLE: 'Scharff',
      COMPANY_SLUG: 'scharff',
      THEME: 'scharff',
      SHOW_SERVICE_TYPE: 0,
      DEFAULT_LANG: 'es'
    }
  }
}

export default config
