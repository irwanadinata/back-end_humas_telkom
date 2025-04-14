-- Buat database
CREATE DATABASE IF NOT EXISTS layanan_db;
USE layanan_db;

-- Table Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table Liputan Kegiatan
CREATE TABLE liputan_kegiatan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    nama VARCHAR(100),
    unit VARCHAR(100),
    nomorwa VARCHAR(20),
    acara VARCHAR(150),
    deskripsi TEXT,
    tanggal_mulai DATE,
    tanggal_selesai DATE,
    waktu_mulai TIME,
    waktu_selesai TIME,
    tempat VARCHAR(100),
    lampiran VARCHAR(255) NULL,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table Penerbitan Berita
CREATE TABLE penerbitan_berita (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    nama VARCHAR(100),
    peran ENUM('dosen', 'pegawai', 'mahasiswa'),
    unit VARCHAR(100),
    nomorwa VARCHAR(20),
    email VARCHAR(100),
    materi ENUM('artikel', 'berita', 'video'),
    media ENUM('instagram', 'website', 'youtube', 'portal'),
    linkmateri VARCHAR(255),
    judul VARCHAR(150),
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table Kemitraan
CREATE TABLE kemitraan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    nama VARCHAR(100),
    perusahaan VARCHAR(100),
    posisi VARCHAR(100),
    email VARCHAR(100),
    nomorwa VARCHAR(20),
    jeniskemitraan VARCHAR(20),
    deskripsi TEXT,
    lampiran VARCHAR(255) NULL,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table Peminjaman Alat
CREATE TABLE peminjaman_alat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    nama VARCHAR(100),
    nim VARCHAR(50),
    unit VARCHAR(100),
    nomorwa VARCHAR(20),
    keperluan TEXT,
    tanggal_mulai DATE,
    tanggal_selesai DATE,
    lampiran VARCHAR(255) NULL,
    status ENUM('pending', 'returned', 'borrowed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
