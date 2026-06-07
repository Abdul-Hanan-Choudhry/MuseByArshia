import { Safepay } from '@sfpy/node-sdk'
import type { SafepayEnvironment } from '@sfpy/node-sdk/dist/types/safepay'

const environment = (process.env.SAFEPAY_ENVIRONMENT ?? 'sandbox') as SafepayEnvironment

export const safepay = new Safepay({
  environment,
  apiKey: process.env.SAFEPAY_API_KEY!,
  v1Secret: process.env.SAFEPAY_V1_SECRET!,
  webhookSecret: process.env.SAFEPAY_WEBHOOK_SECRET!,
})
