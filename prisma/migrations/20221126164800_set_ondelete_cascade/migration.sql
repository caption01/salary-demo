/*
  Warnings:

  - Made the column `companyId` on table `CompanyAdmin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `CompanyAdmin` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CompanyAdmin" DROP CONSTRAINT "CompanyAdmin_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyAdmin" DROP CONSTRAINT "CompanyAdmin_userId_fkey";

-- AlterTable
ALTER TABLE "CompanyAdmin" ALTER COLUMN "companyId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "CompanyAdmin" ADD CONSTRAINT "CompanyAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAdmin" ADD CONSTRAINT "CompanyAdmin_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
