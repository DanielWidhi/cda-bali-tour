export async function fireAlert(options: import("sweetalert2").SweetAlertOptions) {
  const { default: Swal } = await import("sweetalert2");
  return Swal.fire(options);
}
