/**
 * SweetAlert2 (~50KB) di-lazy-load lewat dynamic import().
 * Dipanggil hanya saat user benar-benar submit form / klik hapus,
 * supaya tidak ikut membebani JS bundle awal tiap halaman yang memuatnya.
 */
export async function fireAlert(options: import("sweetalert2").SweetAlertOptions) {
  const { default: Swal } = await import("sweetalert2");
  return Swal.fire(options);
}
