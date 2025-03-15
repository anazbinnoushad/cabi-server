/*
  Warnings:

  - Added the required column `userId` to the `Fuel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fuel" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Fuel" ADD CONSTRAINT "Fuel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
