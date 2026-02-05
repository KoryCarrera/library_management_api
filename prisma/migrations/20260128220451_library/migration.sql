/*
  Warnings:

  - The `state` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `_AuthorToBook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_BookToGenre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_AuthorToBook` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_BookToGenre` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "stateUser" AS ENUM ('ACTIVE', 'DISABLE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "state",
ADD COLUMN     "state" "stateUser" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "_AuthorToBook" DROP CONSTRAINT "_AuthorToBook_AB_pkey";

-- AlterTable
ALTER TABLE "_BookToGenre" DROP CONSTRAINT "_BookToGenre_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToBook_AB_unique" ON "_AuthorToBook"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToGenre_AB_unique" ON "_BookToGenre"("A", "B");
