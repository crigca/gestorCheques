"use client";

interface Props {
  onClose: () => void;
}

/**
 * @description Modal de advertencia cuando se alcanza el límite de 30 cheques.
 * @param {Props} props - Propiedades del componente.
 * @param {() => void} props.onClose - Función para cerrar el modal.
 * @returns {JSX.Element} Modal informativo sobre el límite de cheques.
 */
export default function MaxChequesModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* ✅ Título con color rojo para resaltar la advertencia */}
        <h2 className="text-2xl font-bold mb-4 text-red-600">⚠️ Límite Alcanzado</h2>

        {/* ✅ Mensaje informativo */}
        <p className="mb-4 text-gray-700 text-center">
          No puedes agregar más cheques. El límite máximo de{" "}
          <span className="font-bold">30</span> cheques ha sido alcanzado.
        </p>

        {/* ✅ Botón para cerrar el modal */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
