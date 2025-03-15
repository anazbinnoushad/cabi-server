/*
  Warnings:

  - Added the required column `type` to the `Fuel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fuel" ADD COLUMN     "type" TEXT NOT NULL;
