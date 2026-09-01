"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { cn } from "@/lib/utils";

async function uploadFile(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
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
      await Swal.fire({
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
        className={cn(
          "relative flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-black/15 bg-black/[0.02] text-sm text-black/50 hover:border-[color:var(--color-amber)] transition-colors overflow-hidden"
        )}
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
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <>
            <Upload className="h-6 w-6" />
            <span>Klik atau drag gambar ke sini (PNG/JPG, maks 5MB)</span>
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

/** Upload banyak gambar sekaligus — hasil ditambahkan sebagai daftar URL (1 per baris). */
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
      await Swal.fire({
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
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <>
            <Upload className="h-6 w-6" />
            <span>Klik atau drag beberapa gambar sekaligus (PNG/JPG, maks 5MB/file)</span>
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
