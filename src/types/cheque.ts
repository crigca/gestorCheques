export interface Cheque {
  readonly id: number; // ✅ ID inmutable (no debe cambiar una vez creado)
  holder?: string; // ✅ Puede ser opcional
  date: string; // ✅ Siempre en formato `YYYY-MM-DD`
  dueDate: string; // ✅ Siempre en formato `YYYY-MM-DD`
  amount: number;
  checkNumber: string;
  bankName?: string; // ✅ Puede ser opcional
  bandeja: "entrada" | "salida"; // ✅ Tipo restringido para evitar errores
}
