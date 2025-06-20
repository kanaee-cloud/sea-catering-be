/*
  Warnings:

  - You are about to alter the column `userId` on the `refreshtoken` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userId` on the `subscription` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `username` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(30)`.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `refreshtoken` DROP FOREIGN KEY `RefreshToken_userId_fkey`;

-- DropForeignKey
ALTER TABLE `subscription` DROP FOREIGN KEY `Subscription_userId_fkey`;

-- DropIndex
DROP INDEX `RefreshToken_userId_fkey` ON `refreshtoken`;

-- DropIndex
DROP INDEX `Subscription_userId_fkey` ON `subscription`;

-- AlterTable
ALTER TABLE `refreshtoken` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `subscription` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `username` CHAR(30) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
