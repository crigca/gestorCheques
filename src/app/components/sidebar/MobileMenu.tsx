"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // íconos de hamburguesa y cerrar

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        className="text-white sm:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Abrir menú"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Overlay + Menú */}
      {open && (
        <>
          {/* Fondo oscuro más sutil */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setOpen(false)}
          ></div>

          {/* Menú lateral más compacto */}
          <div className="fixed top-16 left-0 w-3/4 bg-gray-800/90 text-white p-4 rounded-tr-xl rounded-br-xl shadow-lg z-50 h-auto space-y-3">
            {[
              { label: "Inicio", path: "/" },
              { label: "Panel General", path: "/general" },
              { label: "Bandeja Entrada", path: "/inbox" },
              { label: "Bandeja Salida", path: "/outbox" },
              { label: "Sobre Nosotros", path: "/about" },
            ].map(({ label, path }) => (
              <Link
                key={label}
                href={path}
                onClick={() => setOpen(false)}
                className="block py-2 px-3 rounded hover:bg-gray-700 transition text-sm font-medium"
              >
                {label}
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}