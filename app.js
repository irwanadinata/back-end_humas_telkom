import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import multer from "multer";
import connection from "./models/connection.js";
import authRoute from "./routes/auth.route.js";
import liputanKegiatanRoute from "./routes/liputan-kegiatan.route.js";
import kemitraanRoute from "./routes/kemitraan.routes.js";
import penerbitanBeritaRoute from "./routes/penerbitan-berita.routes.js";
import peminjamanAlatRoute from "./routes/peminjaman-alat.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve folder upload agar bisa diakses
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/auth", authRoute);
app.use("/liputan-kegiatan", liputanKegiatanRoute);
app.use("/kemitraan", kemitraanRoute);
app.use("/penerbitan-berita", penerbitanBeritaRoute);
app.use("/peminjaman-alat", peminjamanAlatRoute);

// Cek koneksi database
connection.getConnection((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL successfully");
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
