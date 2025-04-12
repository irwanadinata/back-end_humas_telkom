import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import {
  getAllLiputanKegiatan,
  getLiputanKegiatanById,
  getLiputanKegiatanByUser,
  addLiputanKegiatan,
  updateLiputanKegiatan,
  deleteLiputanKegiatan,
  getTotalDataLiputanKegiatan
} from "../controllers/liputan-kegiatan.controller.js";

const liputanKegiatanRoute = Router();

// GET routes
liputanKegiatanRoute.get("/", auth, getAllLiputanKegiatan);
liputanKegiatanRoute.get("/user", auth, getLiputanKegiatanByUser);
liputanKegiatanRoute.get("/total", auth, getTotalDataLiputanKegiatan);
liputanKegiatanRoute.get("/:id", auth, getLiputanKegiatanById);

// POST route dengan upload file
liputanKegiatanRoute.post("/", auth, upload.single("lampiran"), addLiputanKegiatan);

// PUT route dengan upload file
liputanKegiatanRoute.put("/:id", auth, upload.single("lampiran"), updateLiputanKegiatan);

// DELETE route
liputanKegiatanRoute.delete("/:id", auth, deleteLiputanKegiatan);

export default liputanKegiatanRoute;
