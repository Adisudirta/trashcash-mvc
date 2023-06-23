import { PrismaClient } from "@prisma/client";
import { generateHash } from "../src/lib/bcrypt";

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      username: "john_doe",
      email: "john@example.com",
      password: await generateHash("password123"),
    },
    {
      username: "jane_smith",
      email: "jane@example.com",
      password: await generateHash("password456"),
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  const trashes = [
    {
      title: "Old Furniture",
      qty: 2,
      category: "Battery",
      desc: "Used furniture in good condition.",
      price: "100",
      img: "https://images.unsplash.com/photo-1608224873587-81ee37394b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
      userId: 1,
    },
    {
      title: "Broken Electronics",
      qty: 5,
      category: "Battery",
      desc: "Electronics items for recycling.",
      price: "50",
      img: "https://images.unsplash.com/photo-1608224873587-81ee37394b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
      userId: 2,
    },
  ];

  for (const trash of trashes) {
    await prisma.trash.create({
      data: trash,
    });
  }

  console.log("🌱 Seed data success");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
