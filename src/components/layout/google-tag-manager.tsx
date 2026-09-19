import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Google Tag Manager — cuma aktif kalau NEXT_PUBLIC_GTM_ID diisi di .env.
 * Sengaja dipasang di [locale]/layout.tsx (bukan root layout), supaya HANYA
 * melacak halaman publik/marketing, bukan ikut melacak aktivitas di admin.
 */
export function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
    <Script id="gtm-script" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/** Fallback untuk browser yang mematikan JavaScript — taruh persis setelah <body> buka. */
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
