"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminHeaderProfileProps {
  name: string;
  role: "SUPERADMIN" | "ADMIN";
  className?: string;
  loop?: boolean;
}

type Phase =
  | "typing-name"
  | "pause-to-role"
  | "typing-role"
  | "holding"
  | "deleting-role"
  | "pause-to-name"
  | "deleting-name"
  | "pause-restart";

export function AdminHeaderProfile({
  name,
  role,
  className,
  loop = true,
}: AdminHeaderProfileProps) {
  const roleLabel = role === "SUPERADMIN" ? "Super Admin" : "Admin";

  const [displayedName, setDisplayedName] = useState("");
  const [displayedRole, setDisplayedRole] = useState("");
  const [activeCursor, setActiveCursor] = useState<"name" | "role" | null>("name");
  const [restartTrigger, setRestartTrigger] = useState(0);

  useEffect(() => {
    let isMounted = true;
    let timerId: NodeJS.Timeout;

    // Deteksi preferensi reduced motion
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      timerId = setTimeout(() => {
        if (!isMounted) return;
        setDisplayedName(name);
        setDisplayedRole(roleLabel);
        setActiveCursor(null);
      }, 0);
      return () => {
        isMounted = false;
        clearTimeout(timerId);
      };
    }

    let phase: Phase = "typing-name";
    let currentName = "";
    let currentRole = "";

    const tick = () => {
      if (!isMounted) return;

      if (phase === "typing-name") {
        setActiveCursor("name");
        if (currentName.length < name.length) {
          currentName = name.slice(0, currentName.length + 1);
          setDisplayedName(currentName);
          timerId = setTimeout(tick, 60);
        } else {
          phase = "pause-to-role";
          timerId = setTimeout(tick, 220);
        }
      } else if (phase === "pause-to-role") {
        setActiveCursor("role");
        phase = "typing-role";
        timerId = setTimeout(tick, 60);
      } else if (phase === "typing-role") {
        setActiveCursor("role");
        if (currentRole.length < roleLabel.length) {
          currentRole = roleLabel.slice(0, currentRole.length + 1);
          setDisplayedRole(currentRole);
          timerId = setTimeout(tick, 45);
        } else {
          phase = "holding";
          timerId = setTimeout(tick, 3500); // Ditampilkan lengkap selama 3.5 detik untuk dibaca
        }
      } else if (phase === "holding") {
        if (!loop) {
          setActiveCursor(null);
          return;
        }
        phase = "deleting-role";
        timerId = setTimeout(tick, 30);
      } else if (phase === "deleting-role") {
        setActiveCursor("role");
        if (currentRole.length > 0) {
          currentRole = currentRole.slice(0, -1);
          setDisplayedRole(currentRole);
          timerId = setTimeout(tick, 25);
        } else {
          phase = "pause-to-name";
          timerId = setTimeout(tick, 150);
        }
      } else if (phase === "pause-to-name") {
        setActiveCursor("name");
        phase = "deleting-name";
        timerId = setTimeout(tick, 30);
      } else if (phase === "deleting-name") {
        setActiveCursor("name");
        if (currentName.length > 0) {
          currentName = currentName.slice(0, -1);
          setDisplayedName(currentName);
          timerId = setTimeout(tick, 25);
        } else {
          phase = "pause-restart";
          timerId = setTimeout(tick, 600); // Jeda sebelum mengetik kembali
        }
      } else if (phase === "pause-restart") {
        phase = "typing-name";
        timerId = setTimeout(tick, 100);
      }
    };

    // Mulai animasi otomatis
    timerId = setTimeout(tick, 100);

    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, [name, roleLabel, loop, restartTrigger]);

  const handleReplay = () => {
    setDisplayedName("");
    setDisplayedRole("");
    setActiveCursor("name");
    setRestartTrigger((k) => k + 1);
  };

  const Icon = role === "SUPERADMIN" ? ShieldCheck : UserCog;

  return (
    <div
      onClick={handleReplay}
      title="Efek ketik berulang otomatis (klik untuk mulai ulang)"
      className={cn(
        "group cursor-pointer select-none transition-opacity hover:opacity-90",
        className
      )}
    >
      {/* Aksesibilitas screen reader */}
      <span className="sr-only">
        {name} — {roleLabel}
      </span>

      {/* Grid container: Ghost layer mencegah layout shift dan pergeseran ikon lonceng */}
      <div className="grid">
        {/* Layer 1 (Ghost Placeholder): Mengunci lebar & tinggi secara presisi */}
        <div
          aria-hidden="true"
          className="invisible col-start-1 row-start-1 text-right leading-tight select-none pointer-events-none"
        >
          <p className="text-sm font-medium whitespace-nowrap">{name}</p>
          <p className="flex items-center justify-end gap-1 text-xs whitespace-nowrap">
            <Icon className="h-3 w-3 shrink-0" />
            <span>{roleLabel}</span>
          </p>
        </div>

        {/* Layer 2: Animasi Typewriter */}
        <div
          aria-hidden="true"
          className="col-start-1 row-start-1 flex flex-col items-end justify-center text-right leading-tight"
        >
          {/* Baris Nama Admin dengan Typewriter Cursor */}
          <p className="text-sm font-medium text-[color:var(--color-ink)] flex items-center justify-end min-h-[1.25rem]">
            <span>{displayedName}</span>
            {activeCursor === "name" && (
              <span className="inline-block w-[1.5px] h-[1em] bg-[color:var(--color-amber)] ml-0.5 align-middle animate-typewriter-cursor" />
            )}
          </p>

          {/* Baris Role Admin dengan Typewriter Cursor */}
          <p className="flex items-center justify-end gap-1 text-xs min-h-[1rem]">
            <span
              className={cn(
                "transition-all duration-300 inline-flex items-center",
                displayedRole || activeCursor === "role"
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-75"
              )}
            >
              <Icon
                className={cn(
                  "h-3 w-3 shrink-0",
                  role === "SUPERADMIN"
                    ? "text-[color:var(--color-amber-deep)]"
                    : "text-black/50"
                )}
              />
            </span>
            <span
              className={cn(
                role === "SUPERADMIN"
                  ? "text-[color:var(--color-amber-deep)] font-medium"
                  : "text-black/50"
              )}
            >
              {displayedRole}
            </span>
            {activeCursor === "role" && (
              <span className="inline-block w-[1.5px] h-[0.9em] bg-[color:var(--color-amber)] ml-0.5 align-middle animate-typewriter-cursor" />
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
