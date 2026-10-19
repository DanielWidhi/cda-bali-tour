// Zona transport tetap 4. Nama tampil ("Zona 1" / "Zone 1") dibentuk dari terjemahan,
// deskripsi area per zona diisi admin lewat /admin/transport/zones.
export const ZONE_NUMBERS = [1, 2, 3, 4] as const;
export type ZoneNumber = (typeof ZONE_NUMBERS)[number];
