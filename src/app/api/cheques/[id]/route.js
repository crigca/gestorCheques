import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

/**
 * @description Obtiene un cheque específico por su ID
 */
export async function GET(request, { params }) {
  try {
    const cheque = await prisma.cheque.findUnique({
      where: { id: Number(params.id) },
    });

    if (!cheque) {
      return NextResponse.json({ error: "Cheque no encontrado" }, { status: 404 });
    }

    return NextResponse.json(cheque);
  } catch (error) {
    console.error("📌 Error en la API al obtener el cheque:", error);
    return NextResponse.json({ error: "Error al obtener el cheque" }, { status: 500 });
  }
}

/**
 * @description Elimina un cheque por su ID
 */
export async function DELETE(request, { params }) {
  try {
    const chequeEliminado = await prisma.cheque.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(chequeEliminado);
  } catch (error) {
    console.error("📌 Error en la API al eliminar el cheque:", error);
    return NextResponse.json({ error: "Error al eliminar el cheque" }, { status: 500 });
  }
}

/**
 * @description Actualiza un cheque existente por su ID
 */
export async function PUT(request, { params }) {
  try {
    const chequeId = Number(params.id); // Se obtiene el ID del cheque
    const data = await request.json(); // Se extraen los datos de la solicitud

    const updatedCheque = await prisma.cheque.update({
      where: { id: chequeId },
      data: {
        holder: data.holder,
        bankName: data.bankName,
        amount: parseFloat(data.amount), // Se asegura que el monto sea un número
        checkNumber: data.checkNumber,
        date: new Date(data.date), // Se convierte a DateTime para Prisma
        dueDate: new Date(data.dueDate), // Se convierte a DateTime para Prisma
        bandeja: data.bandeja,
      },
    });

    return NextResponse.json(updatedCheque);
  } catch (error) {
    console.error("📌 Error en la API al actualizar el cheque:", error);
    return NextResponse.json({ error: "Error al actualizar el cheque" }, { status: 500 });
  }
}
