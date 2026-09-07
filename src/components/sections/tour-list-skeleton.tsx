export function TourListSkeleton() {
  return (
    <>
      {/* Skeleton filter pills — jumlah & ukuran meniru kategori asli */}
      <div className="flex flex-wrap gap-2 mb-10">
        {[24, 28, 28, 32, 28].map((w, i) => (
          <div
            key={i}
            className="h-[38px] rounded-full bg-black/5 animate-pulse"
            style={{ width: `${w * 4}px` }}
          />
        ))}
      </div>

      {/* Skeleton grid kartu — dimensi meniru TourCard asli (aspect-[4/3] image + area teks)
          supaya tinggi total halaman tidak "meloncat" begitu data asli masuk. */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-black/5 overflow-hidden">
            <div className="aspect-[4/3] bg-black/5 animate-pulse" />
            <div className="p-5 flex flex-col gap-3">
              <div className="h-3 w-1/3 rounded bg-black/5 animate-pulse" />
              <div className="h-5 w-4/5 rounded bg-black/5 animate-pulse" />
              <div className="h-4 w-full rounded bg-black/5 animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-black/5 animate-pulse" />
              <div className="flex items-center justify-between pt-3 border-t border-black/5">
                <div className="h-6 w-24 rounded bg-black/5 animate-pulse" />
                <div className="h-8 w-16 rounded-full bg-black/5 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
