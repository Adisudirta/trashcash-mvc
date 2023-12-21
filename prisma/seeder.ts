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
      img: "https://trashcashstorage.blob.core.windows.net/trashcash-storage-container/DS220100-1531-00-main-img_1.png",
      userId: 1,
    },
    {
      title: "Broken Electronics",
      qty: 5,
      category: "Battery",
      desc: "Electronics items for recycling.",
      price: "50",
      img: "https://trashcashstorage.blob.core.windows.net/trashcash-storage-container/DS220100-1531-00-main-img_1.png",
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
