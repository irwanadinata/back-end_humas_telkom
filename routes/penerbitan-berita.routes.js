import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import {
  getAllPenerbitanBerita,
  getPenerbitanBeritaById,
  getPenerbitanBeritaByUser,
  addPenerbitanBerita,
  updatePenerbitanBerita,
  deletePenerbitanBerita,
  getTotalDataPenerbitanBerita
} from "../controllers/penerbitan-berita.controller.js";

const PenerbitanBeritaRoute = Router();

// GET routes
PenerbitanBeritaRoute.get("/", auth, getAllPenerbitanBerita);
PenerbitanBeritaRoute.get("/user", auth, getPenerbitanBeritaByUser);
PenerbitanBeritaRoute.get("/total", auth, getTotalDataPenerbitanBerita);
PenerbitanBeritaRoute.get("/:id", auth, getPenerbitanBeritaById);

// POST route dengan upload file
PenerbitanBeritaRoute.post("/", auth, upload.single("lampiran"), addPenerbitanBerita);

// PUT route dengan upload file
PenerbitanBeritaRoute.put("/:id", auth, upload.single("lampiran"), updatePenerbitanBerita);

// DELETE route
PenerbitanBeritaRoute.delete("/:id", auth, deletePenerbitanBerita);

export default PenerbitanBeritaRoute;
