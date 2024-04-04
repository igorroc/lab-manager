-- DropForeignKey
ALTER TABLE "ClassGroup" DROP CONSTRAINT "ClassGroup_classroomId_fkey";

-- AlterTable
ALTER TABLE "ClassGroup" ALTER COLUMN "classroomId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ClassGroup" ADD CONSTRAINT "ClassGroup_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
