import { seedTestUser } from '../tests/helpers/seedUser.js'

async function run() {
  console.log('Seeding test user...')
  await seedTestUser()
  console.log('Seed complete!')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
