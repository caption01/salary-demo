/*
  Warnings:

  - You are about to drop the column `company_admin_id` on the `Employee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_company_admin_id_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "company_admin_id",
ADD COLUMN     "companyAdminId" INTEGER,
ADD COLUMN     "created_by_id" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyAdminId_fkey" FOREIGN KEY ("companyAdminId") REFERENCES "CompanyAdmin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
