// File for entering "seed" data in PostgresQL with the Prisma ORM
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

//Load environment variables
dotenv.config();

const prisma = new PrismaClient(); //create an instance of the prism class to use its functions

async function main() {
  console.log('--- Limpiando base de datos ---');
  //Order is very important because of the foreign key; if the order is not respected, PostgreSQL returns an error
  await prisma.borrowed.deleteMany(); //function to delete data from a table
  await prisma.user.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.rol.deleteMany();
  await prisma.section.deleteMany();

  console.log('--- Creando Roles y Secciones ---');
  const adminRol = await prisma.rol.create({ //Insert data on table rol with function "create"
    data: { name: 'Administrador', description: 'Acceso total al sistema' }
  });

  const studentRol = await prisma.rol.create({
    data: { name: 'Estudiante', description: 'Solo préstamos básicos' }
  });

  const sistemasSection = await prisma.section.create({
    data: { name: 'Sistemas', description: 'Libros de tecnología' }
  });

  console.log('--- Creando Autores y Géneros ---');
  const autor1 = await prisma.author.create({
    data: { name: 'Gabriel', lastName: 'García Márquez' }
  });

  const generoFiccion = await prisma.genre.create({
    data: { name: 'Ficción' }
  });

  console.log('--- Creando Usuarios ---');
  const user1 = await prisma.user.create({
    data: {
      name: 'Kory',
      lastName: 'User',
      email: 'kory@biblioteca.com',
      password: 'password123', 
      state: 'ACTIVE',
      salary: 0,
      rolId: adminRol.id,
      sectionId: sistemasSection.id
    }
  });

  console.log('--- Creando Libros ---');
  await prisma.book.create({
    data: {
      title: 'Cien años de soledad',
      state: 'AVAILABLE',
      author: { connect: { id: autor1.id } },
      genres: { connect: { id: generoFiccion.id } }
    }
  });

  console.log('--- ¡Seed finalizada con éxito! ---');
}

main() //execute the main function
  .catch((e) => { //error handling
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });