"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // íconos de hamburguesa y cerrar

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="sm:hidden p-4 bg-blue-600 text-white">
      {/* Botón Hamburguesa */}
      <button onClick={toggleMenu} className="flex items-center">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
        <span className="ml-2 font-semibold">Menú</span>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <nav className="mt-4 bg-gray-800 rounded-md shadow-md p-4 space-y-2">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <p className="block text-white hover:text-blue-300">Inicio</p>
          </Link>
          <Link href="/general" onClick={() => setIsOpen(false)}>
            <p className="block text-white hover:text-blue-300">Panel General</p>
          </Link>
          <Link href="/inbox" onClick={() => setIsOpen(false)}>
            <p className="block text-white hover:text-blue-300">Bandeja Entrada</p>
          </Link>
          <Link href="/outbox" onClick={() => setIsOpen(false)}>
            <p className="block text-white hover:text-blue-300">Bandeja Salida</p>
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            <p className="block text-white hover:text-blue-300">Sobre Nosotros</p>
          </Link>
        </nav>
      )}
    </div>
  );
}
