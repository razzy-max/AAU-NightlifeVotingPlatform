const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding sample categories and candidates...');

  const categories = [
    { name: 'Best DJ' },
    { name: 'Best Club' },
    { name: 'Best Event Promoter' },
  ];

  for (const cat of categories) {
    const c = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: { name: cat.name },
    });

    // create sample candidates
    await prisma.candidate.upsert({
      where: { slug: `${c.name.toLowerCase().replace(/\s+/g, '-')}-sample` },
      update: {},
      create: {
        name: `${c.name} Sample`,
        slug: `${c.name.toLowerCase().replace(/\s+/g, '-')}-sample`,
        categoryId: c.id,
        description: `Sample candidate for ${c.name}`,
      }
    });
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
