"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { fireAlert } from "@/lib/swal";

// Target kompresi: maks ~400KB & lebar/tinggi maks 1600px, dikonversi ke WebP.
// Dijalankan di browser (bukan server) supaya bandwidth upload lebih hemat
// dan kuota Supabase Storage tidak boros untuk foto asli yang masih besar.
async function compressImage(file: File): Promise<File> {
  const { default: imageCompression } = await import("browser-image-compression");
  try {
    return await imageCompression(file, {
      maxSizeMB: 0.4,
      maxWidthOrHeight: 1600,
      useWebWorker: true,
      fileType: "image/webp",
    });
  } catch {
    // Kalau kompresi gagal (format aneh, dsb), tetap lanjut upload file asli
    // daripada gagal total — validasi ukuran/tipe tetap dicek di server.
    return file;
  }
}

async function uploadFile(file: File, folder: string): Promise<string> {
  const compressed = await compressImage(file);

  const formData = new FormData();
  formData.append("file", compressed, compressed.name || file.name);
  formData.append("folder", folder);

  const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
  const json = await res.json();

  if (!res.ok) throw new Error(json.error ?? "Upload gagal");
  return json.url as string;
}

/** Upload 1 gambar — untuk cover image tour/transport. */
export function SingleImageUpload({
  name,
  folder,
  defaultValue,
}: {
  name: string;
  folder: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const uploadedUrl = await uploadFile(file, folder);
      setUrl(uploadedUrl);
    } catch (err) {
      await fireAlert({
        title: "Upload gagal",
        text: err instanceof Error ? err.message : "Terjadi kesalahan.",
        icon: "error",
        confirmButtonColor: "#b5601c",
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={url} />
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        className="relative flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-black/15 bg-black/[0.02] text-sm text-black/50 hover:border-[color:var(--color-amber)] transition-colors overflow-hidden"
      >
        {url ? (
          <>
            <Image src={url} alt="Preview" fill className="object-cover" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setUrl("");
              }}
              className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : uploading ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Mengompres & mengupload...</span>
          </>
        ) : (
          <>
            <Upload className="h-6 w-6" />
            <span>Klik atau drag gambar ke sini — otomatis dikompres</span>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
    </div>
  );
}

/** Upload banyak gambar sekaligus. */
export function MultiImageUpload({
  name,
  folder,
  defaultValue,
}: {
  name: string;
  folder: string;
  defaultValue?: string[];
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue ?? []);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList) {
    setUploading(true);
    try {
      const uploaded = await Promise.all(
        Array.from(files).map((file) => uploadFile(file, folder))
      );
      setUrls((prev) => [...prev, ...uploaded]);
    } catch (err) {
      await fireAlert({
        title: "Upload gagal",
        text: err instanceof Error ? err.message : "Terjadi kesalahan.",
        icon: "error",
        confirmButtonColor: "#b5601c",
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={urls.join("\n")} />
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
        }}
        className="flex h-28 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-black/15 bg-black/[0.02] text-sm text-black/50 hover:border-[color:var(--color-amber)] transition-colors"
      >
        {uploading ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Mengompres & mengupload...</span>
          </>
        ) : (
          <>
            <Upload className="h-6 w-6" />
            <span>Klik atau drag beberapa gambar sekaligus — otomatis dikompres</span>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) handleFiles(e.target.files);
          }}
        />
      </div>

      {urls.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-3">
          {urls.map((url, i) => (
            <div key={url} className="relative aspect-square rounded-lg overflow-hidden group">
              <Image src={url} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => setUrls((prev) => prev.filter((_, idx) => idx !== i))}
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
