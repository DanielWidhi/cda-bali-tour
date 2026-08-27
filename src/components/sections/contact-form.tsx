"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = `Halo, nama saya ${name}.\n\n${message}`;
    const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
      <Button type="submit" size="lg" className="self-start">
        Kirim via WhatsApp
      </Button>
    </form>
  );
}
