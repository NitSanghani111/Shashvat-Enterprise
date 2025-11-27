import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing categories
  await prisma.category.deleteMany({});

  // Create categories with subcategories
  const categories = [
    {
      name: 'Sanitary Fittings',
      subCategory: ['Basin Taps', 'Kitchen Taps', 'Shower Heads', 'Soap Dispensers']
    },
    {
      name: 'Brass Hardware',
      subCategory: ['Door Handles', 'Hinges', 'Brackets', 'Fasteners']
    },
    {
      name: 'Pipe Fittings',
      subCategory: ['Elbow Joints', 'T-Joints', 'Unions', 'Couplers']
    },
    {
      name: 'Bathroom Accessories',
      subCategory: ['Towel Racks', 'Mirrors', 'Cabinets', 'Shelves']
    },
    {
      name: 'Water Systems',
      subCategory: ['Valves', 'Reducers', 'Filters', 'Check Valves']
    }
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category
    });
  }

  console.log('✅ Categories seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
