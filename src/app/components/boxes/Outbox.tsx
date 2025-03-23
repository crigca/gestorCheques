"use client";
import { useState, useEffect } from "react";
import { FormEvent } from "react";
import MaxChequesModal from "../MaxChequesModal"; // Importamos el modal de advertencia

/**
 * @description Componente de la bandeja de salida para registrar cheques enviados.
 * Permite gestionar hasta 30 cheques y muestra una advertencia cuando se alcanza el límite.
 * @returns {JSX.Element} Formulario de registro de cheques de salida con validación de límite.
 */
export default function Outbox() {
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mensajes de éxito
  const [chequesCount, setChequesCount] = useState(0); // Estado para la cantidad de cheques
  const [showMaxChequesModal, setShowMaxChequesModal] = useState(false); // Estado del modal de límite

  // ✅ Obtener la cantidad de cheques en la base de datos al cargar el componente
  useEffect(() => {
    const fetchChequesCount = async () => {
      try {
        const res = await fetch("/api/cheques");
        const data = await res.json();
        setChequesCount(data.length); // Asigna la cantidad de cheques obtenidos
      } catch (error) {
        console.error("❌ Error al obtener la cantidad de cheques:", error);
      }
    };
    fetchChequesCount();
  }, []);

  /**
   * @description Maneja el envío del formulario para registrar un cheque en la bandeja de salida.
   * @param {FormEvent<HTMLFormElement>} e - Evento del formulario.
   */
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ Si ya hay 30 cheques, mostrar el modal y cancelar el envío
    if (chequesCount >= 30) {
      setShowMaxChequesModal(true);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    // ✅ Extraer datos del formulario
    const bankName = formData.get("bankName") as string;
    const date = formData.get("date") as string;
    const dueDate = formData.get("dueDate") as string;
    const amount = formData.get("amount") ? Number(parseFloat(formData.get("amount") as string).toFixed(2)) : null;
    const checkNumber = formData.get("checkNumber") as string;
    const holder = formData.get("holder") as string;

    try {
      const res = await fetch("/api/cheques", {
        method: "POST",
        body: JSON.stringify({ bankName, date, dueDate, amount, checkNumber, holder, bandeja: "salida" }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setSuccessMessage("✅ Cheque cargado correctamente.");
        setTimeout(() => setSuccessMessage(""), 3000);
        form.reset();

        // ✅ Actualizar la cantidad de cheques después de agregar uno
        setChequesCount((prevCount) => prevCount + 1);
      } else {
        console.error("❌ Error en la API al crear el cheque");
      }
    } catch (error) {
      console.error("❌ Error en la solicitud:", error);
    }
  };

  return (
    <div className="p-8 relative min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mt-6">Bandeja de Salida</h1>

      {/* ✅ Mensaje de éxito al registrar un cheque */}
      {successMessage && (
        <div className="mt-12 bg-green-500 text-white text-xl font-bold p-6 rounded-lg shadow-lg w-full max-w-xl text-center animate-fade-in">
          {successMessage}
        </div>
      )}

      {/* ✅ Formulario para agregar cheques a la bandeja de salida */}
      <form className="mt-4 w-full max-w-lg" onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="holder" className="block text-sm font-medium">Beneficiario del cheque</label>
          <input type="text" id="holder" name="holder" className="mt-1 p-2 border rounded-md w-full" placeholder="Nombre del receptor del cheque" required />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium">Fecha</label>
          <input type="date" id="date" name="date" className="mt-1 p-2 border rounded-md w-full" required />
        </div>

        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-sm font-medium">Fecha de Vencimiento</label>
          <input type="date" id="dueDate" name="dueDate" className="mt-1 p-2 border rounded-md w-full" required />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium">Monto</label>
          <input type="number" id="amount" name="amount" step="0.01" min="0.01" className="mt-1 p-2 border rounded-md w-full" placeholder="Monto del cheque" required />
        </div>

        <div className="mb-4">
          <label htmlFor="checkNumber" className="block text-sm font-medium">Número de Cheque</label>
          <input type="text" id="checkNumber" name="checkNumber" className="mt-1 p-2 border rounded-md w-full" placeholder="Número de cheque" required />
        </div>

        <div className="mb-4">
          <label htmlFor="bankName" className="block text-sm font-medium">Banco</label>
          <input type="text" id="bankName" name="bankName" className="mt-1 p-2 border rounded-md w-full" placeholder="Ingresa el nombre del banco" required />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md">
          Enviar
        </button>
      </form>

      {/* ✅ Mostrar el modal si se ha alcanzado el límite */}
      {showMaxChequesModal && <MaxChequesModal onClose={() => setShowMaxChequesModal(false)} />}
    </div>
  );
}
