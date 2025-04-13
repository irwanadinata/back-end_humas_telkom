import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import {
  getAllPeminjamanAlat,
  getPeminjamanAlatById,
  getPeminjamanAlatByUser,
  addPeminjamanAlat,
  updatePeminjamanAlat,
  deletePeminjamanAlat,
  getTotalDataPeminjamanAlat
} from "../controllers/peminjaman-alat.controller.js";

const PeminjamanAlatRoute = Router();

// GET routes
PeminjamanAlatRoute.get("/", auth, getAllPeminjamanAlat);
PeminjamanAlatRoute.get("/user", auth, getPeminjamanAlatByUser);
PeminjamanAlatRoute.get("/total", auth, getTotalDataPeminjamanAlat);
PeminjamanAlatRoute.get("/:id", auth, getPeminjamanAlatById);

// POST route dengan upload file
PeminjamanAlatRoute.post("/", auth, upload.single("lampiran"), addPeminjamanAlat);

// PUT route dengan upload file
PeminjamanAlatRoute.put("/:id", auth, upload.single("lampiran"), updatePeminjamanAlat);

// DELETE route
PeminjamanAlatRoute.delete("/:id", auth, deletePeminjamanAlat);

export default PeminjamanAlatRoute;
