-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
