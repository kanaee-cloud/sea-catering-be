/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `users` table. All the data in the column will be lost.
  - Added the required column `username` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Users_phoneNumber_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `name`,
    DROP COLUMN `passwordHash`,
    DROP COLUMN `phoneNumber`,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;
