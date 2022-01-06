require('dotenv').config()

export default {
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID
}
