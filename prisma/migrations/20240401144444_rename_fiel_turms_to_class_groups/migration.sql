/*
  Warnings:

  - You are about to drop the column `turmId` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `classGroupId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_turmId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "turmId",
ADD COLUMN     "classGroupId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_classGroupId_fkey" FOREIGN KEY ("classGroupId") REFERENCES "ClassGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
