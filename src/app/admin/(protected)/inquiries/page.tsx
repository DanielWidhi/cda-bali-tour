import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteInquiryAction } from "./actions";
import { StatusSelect } from "./status-select";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Inquiries</h1>
      <p className="text-black/50 mb-8">
        Pesan masuk dari form kontak & booking di website.
      </p>

      <div className="flex flex-col gap-3">
        {inquiries.map((inq) => (
          <div key={inq.id} className="rounded-2xl bg-white border border-black/5 p-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <p className="font-medium">{inq.name}</p>
                {inq.contact && <p className="text-xs text-black/50">{inq.contact}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <StatusSelect id={inq.id} status={inq.status} />
                <DeleteButton itemLabel={inq.name} action={deleteInquiryAction.bind(null, inq.id)} />
              </div>
            </div>
            <p className="text-sm text-black/70 whitespace-pre-line">{inq.message}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-black/40">
              <span>Sumber: {inq.source}</span>
              <span>
                {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(
                  inq.createdAt
                )}
              </span>
            </div>
          </div>
        ))}
        {inquiries.length === 0 && (
          <p className="text-sm text-black/50 rounded-2xl bg-white border border-black/5 p-8 text-center">
            Belum ada inquiry masuk.
          </p>
        )}
      </div>
    </div>
  );
}
