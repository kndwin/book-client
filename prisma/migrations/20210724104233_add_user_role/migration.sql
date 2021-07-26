-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('TEACHER', 'STUDENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole";
