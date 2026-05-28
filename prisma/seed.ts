import { config } from 'dotenv'
config({ path: '.env.local' })

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_INITIAL_PASSWORD!, 12)

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL! },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL!,
      password: hashedPassword,
      name: 'Admin',
      role: 'SUPERADMIN',
    },
  })

  const categories = [
    'Portraits',
    'Abstract',
    'Landscape',
    'Still Life',
    'Limited Editions',
  ]

  for (const name of categories) {
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
    })
  }

  console.log('✅ Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
