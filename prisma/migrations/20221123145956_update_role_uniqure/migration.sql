/*
  Warnings:

  - A unique constraint covering the columns `[level]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Role_level_key" ON "Role"("level");

-- CreateIndex
CREATE UNIQUE INDEX "Role_title_key" ON "Role"("title");
