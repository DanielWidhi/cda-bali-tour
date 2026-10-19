import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "❌ NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib diisi di .env"
  );
  process.exit(1);
}

const [, , email, password, name] = process.argv;

if (!email || !password) {
  console.error(
    '\nGunakan: npm run create-admin -- "email@domain.com" "passwordkamu" "Nama Admin"\n'
  );
  process.exit(1);
}

if (password.length < 6) {
  console.error("❌ Password minimal 6 karakter (syarat Supabase Auth).");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const prisma = new PrismaClient();

async function main() {
  let userId: string | null = null;
  let isExisting = false;

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    // Jika user sudah terdaftar di Supabase Auth, perbarui password-nya
    if (
      error.message?.toLowerCase().includes("already") ||
      error.status === 422
    ) {
      const { data: listData, error: listError } =
        await supabaseAdmin.auth.admin.listUsers();
      if (listError) {
        console.error("❌ Gagal memeriksa daftar user:", listError.message);
        process.exit(1);
      }

      const existingUser = listData.users.find(
        (u) => u.email?.toLowerCase() === email.toLowerCase()
      );

      if (!existingUser) {
        console.error("❌ Gagal membuat admin:", error.message);
        process.exit(1);
      }

      const updateRes = await supabaseAdmin.auth.admin.updateUserById(
        existingUser.id,
        {
          password,
          email_confirm: true,
        }
      );

      if (updateRes.error) {
        console.error(
          "❌ Gagal memperbarui password user:",
          updateRes.error.message
        );
        process.exit(1);
      }

      userId = existingUser.id;
      isExisting = true;
    } else {
      console.error("❌ Gagal membuat admin:", error?.message);
      process.exit(1);
    }
  } else if (data.user) {
    userId = data.user.id;
  }

  if (!userId) {
    console.error("❌ User ID tidak valid.");
    process.exit(1);
  }

  await prisma.profile.upsert({
    where: { id: userId },
    update: {
      email,
      name: name?.trim() || undefined,
      role: "SUPERADMIN",
    },
    create: {
      id: userId,
      email,
      name: name?.trim() || "Super Admin",
      role: "SUPERADMIN",
    },
  });

  if (isExisting) {
    console.log(`\n✅ Akun lama terdeteksi dan berhasil di-reset: ${email}`);
    console.log(`🔑 Password baru berhasil diterapkan & role disetel ke SUPERADMIN.`);
  } else {
    console.log(`\n✅ Superadmin baru berhasil dibuat: ${email}`);
  }

  console.log("👉 Sekarang kamu bisa login di /admin/login dengan email & password ini.\n");
}

main().finally(() => prisma.$disconnect());
