/*
  Warnings:

  - You are about to drop the `subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `subscription` DROP FOREIGN KEY `Subscription_userId_fkey`;

-- DropTable
DROP TABLE `subscription`;

-- CreateTable
CREATE TABLE `subscriptions` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `name` CHAR(50) NOT NULL,
    `phoneNumber` VARCHAR(20) NOT NULL,
    `planType` ENUM('DIET', 'PROTEIN', 'ROYALE') NOT NULL,
    `mealTypes` VARCHAR(191) NOT NULL,
    `deliveryDays` VARCHAR(191) NOT NULL,
    `allergies` TEXT NULL,
    `totalPrice` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'ACTIVE', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `subscriptions_phoneNumber_idx`(`phoneNumber`),
    INDEX `subscriptions_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
