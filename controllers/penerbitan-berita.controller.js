import PenerbitanBerita from "../models/penerbitan-berita-model.js";
import fs from "fs";
import path from "path";

// GET ALL
export const getAllPenerbitanBerita = async (req, res) => {
  try {
    const data = await PenerbitanBerita.getAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil data peminjaman alat",
      error: err.message,
    });
  }
};

// GET BY ID
export const getPenerbitanBeritaById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await PenerbitanBerita.getById(id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data", error: err.message });
  }
};

// GET BY USER ID
export const getPenerbitanBeritaByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await PenerbitanBerita.getByUser(userId);
    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data user", error: err.message });
  }
};

// CREATE
export const addPenerbitanBerita = async (req, res) => {
  try {
    const {
      nama,
      peran,
      unit,
      nomorwa,
      email,
      materi,
      media,
      linkmateri,
      judul,
    } = req.body;

    const data = {
      nama,
      peran,
      unit,
      nomorwa,
      email,
      materi,
      media,
      linkmateri,
      judul,
      user_id: req.user.id,
      status: "pending",
    };

    await PenerbitanBerita.create(data);
    res.status(201).json({ message: "Data berhasil ditambahkan" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal menyimpan data", error: err.message });
  }
};

// UPDATE
export const updatePenerbitanBerita = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nama,
      peran,
      unit,
      nomorwa,
      email,
      materi,
      media,
      linkmateri,
      judul,
      status,
    } = req.body;

    const updatedData = {
      nama,
      peran,
      unit,
      nomorwa,
      email,
      materi,
      media,
      linkmateri,
      judul,
      status,
    };

    await PenerbitanBerita.update(id, updatedData);

    res.status(200).json({ message: "Data berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ message: "Gagal update data", error: err.message });
  }
};

// DELETE
export const deletePenerbitanBerita = async (req, res) => {
  try {
    const id = req.params.id;
    await PenerbitanBerita.delete(id);
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal menghapus data", error: err.message });
  }
};

// GET TOTAL DATA
export const getTotalDataPenerbitanBerita = async (req, res) => {
  try {
    const total = await PenerbitanBerita.getTotal();
    res.status(200).json({ total });
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil total data",
      error: err.message,
    });
  }
};
