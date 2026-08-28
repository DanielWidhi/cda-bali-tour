"use client";

import { useState, useTransition, FormEvent } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";
import { submitContactAction } from "@/app/kontak/actions";

export function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    startTransition(async () => {
      try {
        await submitContactAction({ name, message });

        await Swal.fire({
          title: "Pesan terkirim!",
          text: "Tim kami akan segera menghubungi Anda. Anda juga akan diarahkan ke WhatsApp untuk chat langsung.",
          icon: "success",
          confirmButtonText: "Lanjut ke WhatsApp",
          confirmButtonColor: "#b5601c",
        });

        const text = `Halo, nama saya ${name}.\n\n${message}`;
        const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank", "noopener,noreferrer");

        setName("");
        setMessage("");
      } catch {
        await Swal.fire({
          title: "Gagal mengirim",
          text: "Terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung via WhatsApp.",
          icon: "error",
          confirmButtonColor: "#b5601c",
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" data-aos="fade-up">
      <div>
        <Label htmlFor="name">Nama</Label>
        <Input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama lengkap Anda"
        />
      </div>
      <div>
        <Label htmlFor="message">Pesan</Label>
        <Textarea
          id="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ceritakan rencana perjalanan Anda — tanggal, jumlah orang, tujuan yang diminati..."
        />
      </div>
      <Button type="submit" size="lg" className="self-start" disabled={pending}>
        {pending ? "Mengirim..." : "Kirim Pesan"}
      </Button>
    </form>
  );
}
