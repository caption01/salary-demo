/*
  Warnings:

  - You are about to drop the column `company_id` on the `CompanyAdmin` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `CompanyAdmin` table. All the data in the column will be lost.
  - You are about to drop the column `base_salary` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `companyAdminId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_id` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `TransferRequest` table. All the data in the column will be lost.
  - You are about to drop the column `employee_id` on the `TransferRequest` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `TransferRequest` table. All the data in the column will be lost.
  - You are about to drop the column `is_super_admin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `CompanyAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `CompanyAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseSalary` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `companyId` to the `TransferRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `TransferRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TransferRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyAdmin" DROP CONSTRAINT "CompanyAdmin_company_id_fkey";

-- DropForeignKey
ALTER TABLE "CompanyAdmin" DROP CONSTRAINT "CompanyAdmin_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_companyAdminId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_userId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_user_id_fkey";

-- DropForeignKey
ALTER TABLE "TransferRequest" DROP CONSTRAINT "TransferRequest_company_id_fkey";

-- DropForeignKey
ALTER TABLE "TransferRequest" DROP CONSTRAINT "TransferRequest_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "TransferRequest" DROP CONSTRAINT "TransferRequest_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_id_fkey";

-- AlterTable
ALTER TABLE "CompanyAdmin" DROP COLUMN "company_id",
DROP COLUMN "user_id",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "base_salary",
DROP COLUMN "companyAdminId",
DROP COLUMN "company_id",
DROP COLUMN "created_by_id",
DROP COLUMN "user_id",
ADD COLUMN     "baseSalary" INTEGER NOT NULL,
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "createdById" INTEGER NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TransferRequest" DROP COLUMN "company_id",
DROP COLUMN "employee_id",
DROP COLUMN "user_id",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "employeeId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "is_super_admin",
DROP COLUMN "role_id",
ADD COLUMN     "isSuperAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "roleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CompanyAdmin" ADD CONSTRAINT "CompanyAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAdmin" ADD CONSTRAINT "CompanyAdmin_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferRequest" ADD CONSTRAINT "TransferRequest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferRequest" ADD CONSTRAINT "TransferRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferRequest" ADD CONSTRAINT "TransferRequest_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
