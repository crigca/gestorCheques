"use client";
import { useState } from "react";
import { Cheque } from "@/types/cheque";

interface Props {
  cheque: Cheque;
  onClose: () => void;
  onSave: (cheque: Cheque) => void;
}

/**
 * @description Modal para editar la información de un cheque.
 * @param {Props} props - Propiedades del componente.
 * @param {Cheque} props.cheque - Objeto del cheque a editar.
 * @param {() => void} props.onClose - Función para cerrar el modal.
 * @param {(cheque: Cheque) => void} props.onSave - Función para actualizar el cheque editado.
 * @returns {JSX.Element} Modal de edición del cheque.
 */
export default function EditChequeModal({ cheque, onClose, onSave }: Props) {
  // ✅ Estado local para manejar la edición del cheque
  const [editedCheque, setEditedCheque] = useState<Cheque>(() => ({
    ...cheque,
    date: cheque.date.split("T")[0], // ✅ Convertimos `YYYY-MM-DDTHH:mm:ss.sssZ` a `YYYY-MM-DD`
    dueDate: cheque.dueDate.split("T")[0],
  }));

  /**
   * @description Maneja el envío del formulario y guarda los cambios del cheque.
   * @param {React.FormEvent} e - Evento de formulario.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedCheque = {
      ...editedCheque,
      date: new Date(`${editedCheque.date}T00:00:00Z`).toISOString(),
      dueDate: new Date(`${editedCheque.dueDate}T00:00:00Z`).toISOString(),
    };

    try {
      const res = await fetch(`/api/cheques/${cheque.id}`, {
        method: "PUT", // ✅ Se usa `PUT` para editar un cheque existente
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedCheque),
      });

      if (!res.ok) {
        alert("❌ Error al actualizar el cheque");
        return;
      }

      onSave(formattedCheque); // ✅ Actualiza la lista con el cheque editado
      onClose(); // ✅ Cierra el modal después de editar
    } catch (error) {
      console.error("❌ Error en la solicitud:", error);
      alert("❌ Error inesperado al editar el cheque");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">✏️ Editar Cheque</h2>
        
        <form onSubmit={handleSubmit}>
          {/* ✅ Campos de edición */}
          <label className="block text-left">Titular:</label>
          <input
            type="text"
            value={editedCheque.holder}
            onChange={(e) => setEditedCheque({ ...editedCheque, holder: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />

          <label className="block text-left">Banco:</label>
          <input
            type="text"
            value={editedCheque.bankName}
            onChange={(e) => setEditedCheque({ ...editedCheque, bankName: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />

          <label className="block text-left">Monto:</label>
          <input
            type="number"
            value={editedCheque.amount}
            onChange={(e) => setEditedCheque({ ...editedCheque, amount: parseFloat(e.target.value) })}
            className="w-full p-2 border rounded mb-2"
          />

          <label className="block text-left">Número de Cheque:</label>
          <input
            type="text"
            value={editedCheque.checkNumber}
            onChange={(e) => setEditedCheque({ ...editedCheque, checkNumber: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />

          {/* ✅ Fechas con formato adecuado */}
          <label className="block text-left">Fecha de Emisión:</label>
          <input
            type="date"
            value={editedCheque.date}
            onChange={(e) =>
              setEditedCheque({ ...editedCheque, date: new Date(e.target.value).toISOString().split("T")[0] })
            }
            className="w-full p-2 border rounded mb-2"
          />

          <label className="block text-left">Fecha de Vencimiento:</label>
          <input
            type="date"
            value={editedCheque.dueDate}
            onChange={(e) =>
              setEditedCheque({ ...editedCheque, dueDate: new Date(e.target.value).toISOString().split("T")[0] })
            }
            className="w-full p-2 border rounded mb-2"
          />

          {/* ✅ Botones de acción */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
