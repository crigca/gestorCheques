"use client";
import { Cheque } from "@/types/cheque";

interface Props {
  cheque: Cheque | null;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

/**
 * @description Modal de confirmación para eliminar un cheque.
 * @param {Props} props - Propiedades del componente.
 * @param {Cheque | null} props.cheque - Cheque seleccionado para eliminar.
 * @param {() => void} props.onClose - Función para cerrar el modal sin eliminar.
 * @param {(id: number) => void} props.onConfirm - Función para confirmar la eliminación del cheque.
 * @returns {JSX.Element | null} Modal de eliminación o `null` si no hay cheque seleccionado.
 */
export default function DeleteChequeModal({ cheque, onClose, onConfirm }: Props) {
  if (!cheque) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* ✅ Título destacado en rojo */}
        <h2 className="text-2xl font-bold mb-4 text-red-600">🗑️ Eliminar Cheque</h2>

        {/* ✅ Mensaje de confirmación */}
        <p className="mb-4 text-gray-700 text-center">
          ¿Estás seguro de que deseas eliminar el cheque de{" "}
          <span className="font-bold">{cheque.holder}</span>?
        </p>

        {/* ✅ Botones de acción */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onConfirm(cheque.id)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Sí, eliminar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
