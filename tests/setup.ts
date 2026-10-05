import '@testing-library/jest-dom/vitest'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local for Vitest
config({ path: resolve(__dirname, '../.env.local') })