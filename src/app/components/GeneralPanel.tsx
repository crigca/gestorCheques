"use client";
import { useEffect, useState } from "react";
import ChequeTable from "./ChequeTable";
import EditChequeModal from "./EditChequeModal";
import DeleteChequeModal from "./DeleteChequeModal";
import { Cheque } from "@/types/cheque";

/**
 * @description Componente principal del panel de gestión de cheques.
 * Permite visualizar, editar y eliminar cheques en las bandejas de entrada y salida.
 * @returns {JSX.Element} Panel con las tablas de cheques y modales de edición y eliminación.
 */
export default function GeneralPanel() {
  const [cheques, setCheques] = useState<Cheque[]>([]);
  const [editingCheque, setEditingCheque] = useState<Cheque | null>(null);
  const [deletingCheque, setDeletingCheque] = useState<Cheque | null>(null);

  /**
   * @description Obtiene la lista de cheques desde la API al cargar el componente.
   */
  useEffect(() => {
    async function fetchCheques() {
      try {
        const res = await fetch("/api/cheques");
        if (!res.ok) throw new Error("Error al obtener cheques");
        const data: Cheque[] = await res.json();
        setCheques([...data]);
      } catch (error) {
        console.error("📌 Error en fetchCheques:", error);
      }
    }
    fetchCheques();
  }, []);

  /**
   * @description Maneja la actualización de un cheque en la base de datos.
   * @param {Cheque} updatedCheque - Objeto del cheque actualizado.
   */
  const handleSave = async (updatedCheque: Cheque) => {
    if (!updatedCheque || Object.keys(updatedCheque).length === 0) {
      console.error("❌ Error: El cheque está vacío.");
      return;
    }

    try {
      const res = await fetch(`/api/cheques/${updatedCheque.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedCheque),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const updated = await res.json();
        setCheques((prevCheques) =>
          prevCheques.map((c) => (c.id === updated.id ? updated : c))
        );
        setEditingCheque(null);
      } else {
        const errorText = await res.text();
        console.error("❌ Error al actualizar el cheque en la API:", errorText);
      }
    } catch (error) {
      console.error("📌 Error en la actualización:", error);
    }
  };

  /**
   * @description Maneja la eliminación de un cheque en la base de datos.
   * @param {number} id - ID del cheque a eliminar.
   */
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/cheques/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setCheques((prevCheques) => prevCheques.filter((cheque) => cheque.id !== id));
        setDeletingCheque(null);
      } else {
        console.error("❌ Error al eliminar el cheque");
      }
    } catch (error) {
      console.error("📌 Error en la eliminación:", error);
    }
  };

  /**
   * @description Abre el modal de edición con el cheque seleccionado.
   * @param {Cheque} cheque - Cheque a editar.
   */
  const handleEdit = (cheque: Cheque) => {
    setEditingCheque(cheque);
  };

  return (
    <div className="px-4 sm:px-8 py-6 text-center">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 mb-5 uppercase tracking-wide break-words text-center">
  📑 Panel General de Cheques
</h1>


      {/* Modal de Edición */}
      {editingCheque && (
        <EditChequeModal
          cheque={editingCheque}
          onClose={() => setEditingCheque(null)}
          onSave={handleSave}
        />
      )}

      {/* Modal de Eliminación */}
      {deletingCheque && (
        <DeleteChequeModal
          cheque={deletingCheque}
          onClose={() => setDeletingCheque(null)}
          onConfirm={handleDelete}
        />
      )}

      <div className="flex flex-col gap-8">
        {/* Tabla de Cheques Recibidos */}
        <ChequeTable
          cheques={cheques.filter((c) => c.bandeja === "entrada")}
          titulo="📩 Cheques Recibidos"
          color="text-green-600"
          onDelete={(id) => setDeletingCheque(cheques.find((c) => c.id === id) || null)}
          onEdit={handleEdit}
        />

        {/* Tabla de Cheques Enviados */}
        <ChequeTable
          cheques={cheques.filter((c) => c.bandeja === "salida")}
          titulo="📤 Cheques Enviados"
          color="text-blue-600"
          onDelete={(id) => setDeletingCheque(cheques.find((c) => c.id === id) || null)}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}
