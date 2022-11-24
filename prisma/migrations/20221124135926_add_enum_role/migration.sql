/*
  Warnings:

  - Added the required column `role` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleLevel" AS ENUM ('SUPER_ADMIN', 'CLIENT_ADMIN', 'EMPLOYEE');

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "role" "RoleLevel" NOT NULL;
