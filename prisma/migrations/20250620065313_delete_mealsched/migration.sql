/*
  Warnings:

  - You are about to drop the `mealschedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `mealschedule` DROP FOREIGN KEY `MealSchedule_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `mealschedule` DROP FOREIGN KEY `MealSchedule_subscriptionId_fkey`;

-- DropTable
DROP TABLE `mealschedule`;
