"use client";
import { Cheque } from "@/types/cheque";

interface Props {
  cheques: Cheque[];
  titulo: string;
  color: string;
  onDelete: (id: number) => void;
  onEdit: (cheque: Cheque) => void;
}

/**
 * @description Función para formatear una fecha en formato `YYYY-MM-DD`.
 * @param {string | null | undefined} dateString - Fecha en formato ISO o nula.
 * @returns {string} Fecha formateada o mensaje de error si es inválida.
 */
const formatDate = (dateString?: string | null): string => {
  if (!dateString) return "N/A"; // ✅ Manejo de valores nulos o indefinidos

  const date = new Date(dateString);

  // ✅ Verificar si la fecha es inválida
  if (isNaN(date.getTime())) {
    console.error("⚠️ Fecha inválida detectada:", dateString);
    return "Fecha inválida";
  }

  return date.toISOString().split("T")[0]; // ✅ Convertimos a `YYYY-MM-DD`
};

/**
 * @description Tabla para mostrar cheques con opciones de edición y eliminación.
 * @param {Props} props - Propiedades del componente.
 * @returns {JSX.Element} Tabla con la lista de cheques.
 */
export default function ChequeTable({ cheques, titulo, color, onDelete, onEdit }: Props) {
  return (
    <div className="p-6 border rounded-lg shadow-md bg-gray-50 w-full">
      {/* ✅ Título con diseño dinámico */}
      <h2 className={`text-2xl font-extrabold ${color} mb-6 border-b-4 pb-2`}>
        {titulo}
      </h2>

      {/* ✅ Tabla de cheques */}
      <table className="w-full bg-white border border-gray-200 text-left">
        <thead className={color === "text-green-600" ? "bg-green-100" : "bg-blue-100"}>
          <tr>
            <th className="py-2 px-4 border">Titular</th>
            <th className="py-2 px-4 border">Banco</th>
            <th className="py-2 px-4 border">Monto</th>
            <th className="py-2 px-4 border">Número</th>
            <th className="py-2 px-4 border">Fecha</th>
            <th className="py-2 px-4 border">Vencimiento</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cheques.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-600">
                No hay cheques en esta bandeja.
              </td>
            </tr>
          ) : (
            cheques.map((cheque) => (
              <tr key={cheque.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{cheque.holder}</td>
                <td className="py-2 px-4">{cheque.bankName}</td>
                <td className="py-2 px-4 font-bold">{`$${Number(cheque.amount).toFixed(2)}`}</td>
                <td className="py-2 px-4">{cheque.checkNumber}</td>
                <td className="py-2 px-4">{formatDate(cheque.date)}</td> 
                <td className="py-2 px-4">{formatDate(cheque.dueDate)}</td> 
                <td className="py-2 px-4 flex gap-2">
                  <button onClick={() => onDelete(cheque.id)} className="text-red-600 hover:text-red-800">
                    🗑️
                  </button>
                  <button onClick={() => onEdit(cheque)} className="text-blue-600 hover:text-blue-800">
                    ✏️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
