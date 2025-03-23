import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

/**
 * @description Obtiene todos los cheques almacenados en la base de datos.
 * @returns {NextResponse} JSON con la lista de cheques, con fechas en formato `YYYY-MM-DD`.
 */
export async function GET() {
  try {
    const cheques = await prisma.cheque.findMany();
    return NextResponse.json(
      cheques.map((c) => ({
        ...c,
        date: c.date.toISOString().split("T")[0], // ✅ Convierte a `YYYY-MM-DD`
        dueDate: c.dueDate.toISOString().split("T")[0], // ✅ Convierte a `YYYY-MM-DD`
      }))
    );
  } catch (error) {
    console.error("❌ Error en la API al obtener los cheques:", error);
    return NextResponse.json({ error: "Error al obtener los cheques" }, { status: 500 });
  }
}

/**
 * @description Crea un nuevo cheque si no se ha alcanzado el límite de 30 cheques.
 * @param {Request} request - Objeto de solicitud HTTP con los datos del cheque.
 * @returns {NextResponse} JSON con el cheque creado o un mensaje de error.
 */

export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "El cuerpo de la solicitud está vacío" }, { status: 400 });
    }

    // ✅ Obtener la cantidad de cheques antes de crear uno nuevo
    const chequeCount = await prisma.cheque.count();
    
    if (chequeCount >= 30) {
      return NextResponse.json({ error: "Límite máximo de 30 cheques alcanzado" }, { status: 403 });
    }

    const { holder, date, dueDate, amount, checkNumber, bankName, bandeja } = body;

    const newCheque = await prisma.cheque.create({
      data: {
        holder: holder || "Desconocido",
        date: date ? new Date(date) : new Date(),
        dueDate: dueDate ? new Date(dueDate) : new Date(),
        amount: amount ? parseFloat(amount) : 0,
        checkNumber: checkNumber || "Sin número",
        bankName: bankName || "No especificado",
        bandeja: bandeja || "entrada",
      },
    });

    return NextResponse.json(newCheque, { status: 201 });

  } catch (error) {
    console.error("❌ Error en la API al crear un cheque:", error);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}



/**
 * @description Actualiza un cheque existente.
 * @param {Request} request - Objeto de solicitud HTTP con los datos del cheque a actualizar.
 * @returns {NextResponse} JSON con el cheque actualizado o un mensaje de error.
 */
export async function PUT(request) {
  try {
    const { id, holder, date, dueDate, amount, checkNumber, bankName, bandeja } = await request.json();

    // ✅ Asegurar que las fechas se mantengan correctamente sin cambios de zona horaria
    const fixedDate = new Date(`${date}T00:00:00`); 
    const fixedDueDate = new Date(`${dueDate}T00:00:00`); 

    const updatedCheque = await prisma.cheque.update({
      where: { id: Number(id) },
      data: {
        holder,
        date: fixedDate,
        dueDate: fixedDueDate,
        amount,
        checkNumber,
        bankName,
        bandeja,
      },
    });

    return NextResponse.json({
      ...updatedCheque,
      date: updatedCheque.date.toISOString().split("T")[0], // ✅ Convertimos a `YYYY-MM-DD`
      dueDate: updatedCheque.dueDate.toISOString().split("T")[0], // ✅ Convertimos a `YYYY-MM-DD`
    });

  } catch (error) {
    console.error("❌ Error en la API al actualizar un cheque:", error);
    return NextResponse.json({ error: "Error al actualizar el cheque" }, { status: 500 });
  }
}
