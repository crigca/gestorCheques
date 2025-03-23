import Link from "next/link";

/**
 * @description Barra lateral de navegación con enlaces a las secciones principales.
 * @returns {JSX.Element} Sidebar con botones compactos, estilizados y con texto centrado.
 */

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white p-4 w-40 min-h-full">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/">
              <button className="w-full py-2 px-4 text-base font-medium bg-gray-700 hover:bg-gray-600 transition rounded-md shadow text-center">
                Inicio
              </button>
            </Link>
          </li>
          <li>
            <Link href="/general">
              <button className="w-full py-2 px-4 text-base font-medium bg-gray-700 hover:bg-gray-600 transition rounded-md shadow text-center">
                Panel General
              </button>
            </Link>
          </li>
          <li>
            <Link href="/inbox">
              <button className="w-full py-2 px-4 text-base font-medium bg-gray-700 hover:bg-gray-600 transition rounded-md shadow text-center">
                Bandeja Entrada
              </button>
            </Link>
          </li>
          <li>
            <Link href="/outbox">
              <button className="w-full py-2 px-4 text-base font-medium bg-gray-700 hover:bg-gray-600 transition rounded-md shadow text-center">
                Bandeja Salida
              </button>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <button className="w-full py-2 px-4 text-base font-medium bg-gray-700 hover:bg-gray-600 transition rounded-md shadow text-center">
                Sobre Nosotros
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}