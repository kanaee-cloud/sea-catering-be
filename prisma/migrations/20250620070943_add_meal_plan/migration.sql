/*
  Warnings:

  - You are about to alter the column `status` on the `subscription` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to drop the `menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `subscription` MODIFY `status` ENUM('PENDING', 'ACTIVE') NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE `menu`;

-- CreateTable
CREATE TABLE `Mealplan` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,

    UNIQUE INDEX `Mealplan_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
