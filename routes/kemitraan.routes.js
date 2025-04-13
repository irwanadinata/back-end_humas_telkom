import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import {
  getAllKemitraan,
  getKemitraanById,
  getKemitraanByUser,
  addKemitraan,
  updateKemitraan,
  deleteKemitraan,
  getTotalDataKemitraan
} from "../controllers/kemitraan.controller.js";

const kemitraanRoute = Router();

// GET routes
kemitraanRoute.get("/", auth, getAllKemitraan);
kemitraanRoute.get("/user", auth, getKemitraanByUser);
kemitraanRoute.get("/total", auth, getTotalDataKemitraan);
kemitraanRoute.get("/:id", auth, getKemitraanById);

// POST route dengan upload file
kemitraanRoute.post("/", auth, upload.single("lampiran"), addKemitraan);

// PUT route dengan upload file
kemitraanRoute.put("/:id", auth, upload.single("lampiran"), updateKemitraan);

// DELETE route
kemitraanRoute.delete("/:id", auth, deleteKemitraan);

export default kemitraanRoute;
