/*
  Warnings:

  - You are about to drop the column `firstname` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "firstname",
DROP COLUMN "lastname";
