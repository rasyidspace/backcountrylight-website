import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bcl.com' },
    update: {},
    create: {
      email: 'admin@bcl.com',
      name: 'Admin BCL',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log(`Created admin user: ${admin.email} / password: admin123`);

  // 2. Create Initial Categories
  const categories = [
    { name: 'Shelters', slug: 'shelters', description: 'Ultralight tents and tarps' },
    { name: 'Backpacks', slug: 'backpacks', description: 'Lightweight frameless and framed packs' },
    { name: 'Sleep Systems', slug: 'sleep-systems', description: 'Quilts and sleeping pads' },
    { name: 'Accessories', slug: 'accessories', description: 'Essential lightweight gear' }
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('Created initial categories.');

  // 3. Create Initial Brands
  const brands = [
    { name: 'Durston Gear', slug: 'durston-gear' },
    { name: 'Hyperlite Mountain Gear', slug: 'hyperlite-mountain-gear' },
    { name: 'Enlightened Equipment', slug: 'enlightened-equipment' },
    { name: 'Zpacks', slug: 'zpacks' }
  ];

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: brand,
    });
  }
  console.log('Created initial brands.');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
