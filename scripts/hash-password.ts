import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Gunakan: npm run hash-password -- \"passwordkamu\"");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("\nSalin baris ini ke file .env pada ADMIN_PASSWORD_HASH:\n");
console.log(`ADMIN_PASSWORD_HASH="${hash}"\n`);
