"use client";

import { useState, useTransition, FormEvent } from "react";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";
import { saveInquiryAction } from "@/app/actions/inquiry-actions";

export function ContactForm() {
  const t = useTranslations("contactPage");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    startTransition(async () => {
      const result = await saveInquiryAction({
        name,
        contact: phone,
        message,
        source: "contact-form",
      });

      if (!result.ok) {
        await Swal.fire({
          title: t("errorTitle"),
          text: t("errorText"),
          icon: "error",
          confirmButtonColor: "#b5601c",
        });
        return;
      }

      await Swal.fire({
        title: t("successTitle"),
        text: t("successText"),
        icon: "success",
        confirmButtonText: t("successButton"),
        confirmButtonColor: "#b5601c",
      });

      const text = `Halo, nama saya ${name} (${phone}).\n\n${message}`;
      const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener,noreferrer");

      setName("");
      setPhone("");
      setMessage("");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" data-aos="fade-up">
      <div>
        <Label htmlFor="name">{t("nameLabel")}</Label>
        <Input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("namePlaceholder")}
        />
      </div>
      <div>
        <Label htmlFor="phone">{t("phoneLabel")}</Label>
        <Input
          id="phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="08xx-xxxx-xxxx"
        />
        <p className="text-xs text-black/40 mt-1">{t("phoneHint")}</p>
      </div>
      <div>
        <Label htmlFor="message">{t("messageLabel")}</Label>
        <Textarea
          id="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("messagePlaceholder")}
        />
      </div>
      <Button type="submit" size="lg" className="self-start" disabled={pending}>
        {pending ? t("sending") : t("send")}
      </Button>
    </form>
  );
}
