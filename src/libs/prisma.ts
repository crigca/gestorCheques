import { PrismaClient } from "@prisma/client";

// ✅ Almacenar `PrismaClient` en `globalThis` solo en desarrollo para evitar múltiples instancias
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// ✅ Usar la instancia existente o crear una nueva
export const prisma = globalForPrisma.prisma || new PrismaClient();

// ✅ En desarrollo, guardar la instancia en `globalThis` para evitar recreaciones
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
