import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(); //si estoy en produccion creo una coneccion c/req
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(); //env === "dev" guardo en variable global
  }
  prisma = global.prisma;
}

export default prisma;
