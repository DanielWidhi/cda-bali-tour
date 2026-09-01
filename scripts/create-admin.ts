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

// Pakai Service Role Key -> akses penuh, HANYA dijalankan dari CLI lokal,
// jangan pernah expose key ini ke browser/client.
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const prisma = new PrismaClient();

async function main() {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // langsung dianggap terverifikasi, tanpa perlu klik email
  });

  if (error || !data.user) {
    console.error("❌ Gagal membuat admin:", error?.message);
    process.exit(1);
  }

  // Script ini khusus untuk akun PERTAMA -> otomatis jadi SUPERADMIN,
  // supaya ada minimal 1 akun yang bisa mengelola admin lain lewat CMS.
  await prisma.profile.create({
    data: {
      id: data.user.id,
      email: data.user.email!,
      name: name?.trim() || "Super Admin",
      role: "SUPERADMIN",
    },
  });

  console.log(`\n✅ Superadmin berhasil dibuat: ${data.user.email}`);
  console.log("Sekarang kamu bisa login di /admin/login dengan email & password ini.");
  console.log(
    "Untuk menambah admin lain berikutnya, gunakan halaman /admin/users (bukan script ini lagi).\n"
  );
}

main().finally(() => prisma.$disconnect());
