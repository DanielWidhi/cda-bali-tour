import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Apakah harus booking dengan DP terlebih dahulu?",
    answer:
      "Tidak. Anda bisa booking tanpa kartu kredit atau deposit apa pun. Pembayaran dilakukan setelah trip selesai.",
  },
  {
    question: "Apakah ada biaya tersembunyi?",
    answer:
      "Tidak ada. Harga yang tertera sudah termasuk driver, BBM, dan pajak. Biaya tiket masuk objek wisata dan makan biasanya terpisah dan dijelaskan di setiap halaman paket.",
  },
  {
    question: "Berapa lama sebelumnya harus booking?",
    answer:
      "Untuk musim ramai (Juli–Agustus, Desember–Januari) disarankan booking minimal 3-5 hari sebelumnya. Di luar musim ramai, H-1 biasanya masih bisa.",
  },
  {
    question: "Apakah bisa membuat itinerary sendiri?",
    answer:
      "Bisa. Selain paket yang sudah ada, kami juga menyediakan layanan sewa mobil dengan driver agar Anda bisa membuat rute sendiri secara fleksibel.",
  },
];

export function FAQSection() {
  return (
    <section className="mx-auto max-w-3xl px-5 lg:px-8 py-20">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber-deep)]">
          FAQ
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl mt-3">Pertanyaan yang sering diajukan</h2>
      </div>
      <Accordion type="single" collapsible>
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export { faqs };
