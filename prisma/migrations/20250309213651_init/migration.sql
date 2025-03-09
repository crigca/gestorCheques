-- CreateTable
CREATE TABLE `Cheque` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `holder` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `checkNumber` VARCHAR(191) NOT NULL,
    `bankName` VARCHAR(191) NULL,
    `bandeja` VARCHAR(191) NOT NULL DEFAULT 'entrada',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
