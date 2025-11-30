import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

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

  // Create admin user
  const adminEmail = 'admin@shashvatenterprise.com';
  
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true,
        address: 'Admin Office',
        contactNo: '1234567890',
        whatsAppNo: '1234567890'
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log('   Email: admin@shashvatenterprise.com');
    console.log('   Password: admin123');
  } else {
    console.log('ℹ️  Admin user already exists');
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
