import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <p className="font-serif text-6xl text-[color:var(--color-amber)]">404</p>
      <h1 className="font-serif text-2xl mt-4">Halaman tidak ditemukan</h1>
      <p className="text-black/60 mt-2">
        Sepertinya halaman yang Anda cari sudah dipindahkan atau tidak
        tersedia.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Kembali ke Beranda</Link>
      </Button>
    </div>
  );
}
