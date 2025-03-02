import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar/Sidebar";  

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
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          
          {/* ✅ Header */}
          <header className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl">Gestor de Cheques</h1>
          </header>

          <div className="flex flex-1">
            
            {/* ✅ Sidebar */}
            <Sidebar />

            {/* ✅ Contenido principal */}
            <main className="flex-1 p-8 bg-gray-100">{children}</main>
          </div>

          {/* ✅ Footer */}
          <footer className="bg-blue-600 text-white p-4 text-center">
            <p>&copy; {new Date().getFullYear()} Gestor de Cheques. Todos los derechos reservados.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
