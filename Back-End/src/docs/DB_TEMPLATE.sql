CREATE TABLE `MAHASISWA`(
    `id_users` BIGINT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `nim` INT NOT NULL,
    `jurusan` VARCHAR(255) NOT NULL,
    `angkatan` INT NOT NULL,
    `role` ENUM('mahasiswa') NOT NULL
);
CREATE TABLE `PENGAJUAN_KTM`(
    `ID_PENGAJUAN_KTM` BIGINT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_users` BIGINT NOT NULL COMMENT 'FK ke Tabel MAHASISWA(ID_USERS)',
    `filepath` TEXT NOT NULL,
    `note` TEXT NOT NULL,
    `tanggal_pengajuan` DATE NOT NULL,
    `tanggal_pembaruan` DATE NOT NULL,
    `status` ENUM('') NOT NULL
);
CREATE TABLE `ADMIN`(
    `id_admin` BIGINT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `nip` INT NOT NULL,
    `role` ENUM('admin') NOT NULL
);
ALTER TABLE
    `PENGAJUAN_KTM` ADD CONSTRAINT `pengajuan_ktm_id_users_foreign` FOREIGN KEY(`id_users`) REFERENCES `MAHASISWA`(`id_users`);