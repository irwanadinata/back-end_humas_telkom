import Kemitraan from "../models/kemitraan-model.js";
import fs from "fs";
import path from "path";

// GET ALL
export const getAllKemitraan = async (req, res) => {
  try {
    const data = await Kemitraan.getAll();
    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data kemitraan", error: err.message });
  }
};

// GET BY ID
export const getKemitraanById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Kemitraan.getById(id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data", error: err.message });
  }
};

// GET BY USER ID
export const getKemitraanByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await Kemitraan.getByUser(userId);
    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data user", error: err.message });
  }
};

// CREATE
export const addKemitraan = async (req, res) => {
  try {
    const {
      nama,
      perusahaan,
      posisi,
      email,
      nomorwa,
      jeniskemitraan,
      deskripsi,
    } = req.body;

    const lampiran = req.file ? req.file.filename : null;

    const data = {
      nama,
      perusahaan,
      posisi,
      email,
      nomorwa,
      jeniskemitraan,
      deskripsi,
      lampiran,
      user_id: req.user.id,
      status: "pending",
    };

    await Kemitraan.create(data);
    res.status(201).json({ message: "Data berhasil ditambahkan" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal menyimpan data", error: err.message });
  }
};

// UPDATE
export const updateKemitraan = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nama,
      perusahaan,
      posisi,
      email,
      nomorwa,
      jeniskemitraan,
      deskripsi,
      lampiran,
      status,
    } = req.body;

    const newFile = req.file?.filename;

    // 1. Ambil data lama dulu dari database
    const oldData = await Kemitraan.getById(id);
    if (!oldData)
      return res.status(404).json({ message: "Data file tidak ditemukan" });

    // 2. Jika upload file baru, hapus file lama
    if (newFile && oldData.lampiran) {
      const oldFilePath = path.join("uploads", oldData.lampiran);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    }

    // 3. Bangun data yang akan diupdate
    const updatedData = {
      nama,
      perusahaan,
      posisi,
      email,
      nomorwa,
      jeniskemitraan,
      deskripsi,
      lampiran,
      status,
      lampiran: newFile ? newFile : oldData.lampiran,
    };

    // 4. Lakukan update ke database
    await Kemitraan.update(id, updatedData);

    res.status(200).json({ message: "Data berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ message: "Gagal update data", error: err.message });
  }
};

// DELETE
export const deleteKemitraan = async (req, res) => {
  try {
    const id = req.params.id;

    // 1. Ambil data lama dari database berdasarkan id
    const oldData = await Kemitraan.getById(id);

    // 2. Hapus file lampiran jika ada
    if (oldData.lampiran) {
      const filePath = path.join("uploads", oldData.lampiran);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // 3. Hapus data dari database
    await Kemitraan.delete(id);

    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal menghapus data", error: err.message });
  }
};

// GET TOTAL DATA
export const getTotalDataKemitraan = async (req, res) => {
  try {
    const total = await Kemitraan.getTotal();
    res.status(200).json({ total });
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil total data",
      error: err.message,
    });
  }
};
