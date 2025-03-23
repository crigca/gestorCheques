import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar/Sidebar";  
import MobileMenu from "./components/sidebar/MobileMenu"

// ✅ Importación de tipografías de Google Fonts con Next.js
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadatos para SEO y accesibilidad
export const metadata: Metadata = {
  title: "Gestor de Cheques",
  description: "Gestión de cheques de manera eficiente",
};

/**
 * @description Layout principal del sitio, que incluye el header, sidebar y footer.
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido dinámico de cada página.
 * @returns {JSX.Element} Estructura de la aplicación con header, sidebar, contenido y footer.
 */


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          
          {/* ✅ Header con menú móvil */}
          <header className="w-full bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <div className="sm:hidden">
                <MobileMenu />
              </div>
              <h1 className="text-lg sm:text-2xl font-semibold text-center sm:text-left w-full sm:w-auto">
                Gestor de Cheques
              </h1>
            </div>
          </header>

          {/* ✅ Contenido y Sidebar */}
          <div className="flex flex-1">
            <div className="hidden sm:block">
              <Sidebar />
            </div>
            <main className="flex-1 p-4 sm:p-8 bg-gray-100 overflow-x-auto">
              {children}
            </main>
          </div>

          {/* ✅ Footer */}
          <footer className="w-full bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm sm:text-base">
              <p>&copy; {new Date().getFullYear()} Gestor de Cheques. Todos los derechos reservados.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}