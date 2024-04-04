-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "hasAir" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Professor" ADD COLUMN     "phone" TEXT;
