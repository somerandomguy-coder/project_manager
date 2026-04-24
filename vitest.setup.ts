// Any setup scripts you might need go here

// Load .env files
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

// Load test.env if it exists, otherwise fallback to .env
dotenv.config({ path: path.resolve(process.cwd(), 'test.env') })

const testDbFile = path.resolve(process.cwd(), 'data', 'nam-le-portfolio-test.db')
if (fs.existsSync(testDbFile)) {
  fs.rmSync(testDbFile)
}
