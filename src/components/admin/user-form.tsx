"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { UserActionState } from "@/app/admin/(protected)/users/actions";

const initialState: UserActionState = {};

export function UserForm({
  action,
  defaultValues,
  submitLabel,
  isSelf,
}: {
  action: (prevState: UserActionState, formData: FormData) => Promise<UserActionState>;
  defaultValues?: { email: string; name: string; role: "SUPERADMIN" | "ADMIN" };
  submitLabel: string;
  isSelf?: boolean;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const isEdit = Boolean(defaultValues);

  return (
    <form action={formAction} className="flex flex-col gap-5 max-w-md">
      <div>
        <Label htmlFor="name">Nama</Label>
        <Input id="name" name="name" required defaultValue={defaultValues?.name} />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          disabled={isEdit}
          defaultValue={defaultValues?.email}
          className={isEdit ? "opacity-60" : ""}
        />
        {isEdit && (
          <p className="text-xs text-black/40 mt-1">
            Email tidak bisa diubah dari sini.
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="password">
          {isEdit ? "Password Baru (kosongkan jika tidak ingin ganti)" : "Password"}
        </Label>
        <Input id="password" name="password" type="password" required={!isEdit} minLength={6} />
      </div>

      <div>
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          name="role"
          disabled={isSelf}
          defaultValue={defaultValues?.role ?? "ADMIN"}
          className="flex h-11 w-full rounded-xl border border-black/15 bg-white px-4 text-sm outline-none focus-visible:border-[color:var(--color-amber)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-amber)]/20 disabled:opacity-60"
        >
          <option value="ADMIN">Admin</option>
          <option value="SUPERADMIN">Super Admin</option>
        </select>
        {isSelf && (
          <p className="text-xs text-black/40 mt-1">
            Kamu tidak bisa mengubah role akun sendiri.
          </p>
        )}
      </div>

      {state.error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{state.error}</p>
      )}

      <Button type="submit" size="lg" className="self-start" disabled={pending}>
        {pending ? "Menyimpan..." : submitLabel}
      </Button>
    </form>
  );
}
