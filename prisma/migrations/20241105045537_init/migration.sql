/*
  Warnings:

  - Added the required column `address` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
