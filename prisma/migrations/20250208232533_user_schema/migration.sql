/*
  Warnings:

  - Added the required column `newsletter_email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newsletter_gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newsletter_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "newsletter_email" TEXT NOT NULL,
ADD COLUMN     "newsletter_gender" TEXT NOT NULL,
ADD COLUMN     "newsletter_name" TEXT NOT NULL;
