import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { seedServicesAndZones } from "./services-data";

// Menambahkan layanan "Our Service" + 4 zona transport. Aman dijalankan berulang
// (tidak menimpa data yang sudah ada): npm run db:seed:services
const prisma = new PrismaClient();

seedServicesAndZones(prisma)
  .then(() => console.log("Seed Our Service & zona selesai ✅"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
