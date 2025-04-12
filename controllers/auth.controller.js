import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const SECRET = process.env.JWT_SECRET;

// REGISTER
export const register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      nama,
      email,
      password: hashedPassword,
      role: "user",
    };

    const user = await User.create(newUser);
    res.status(201).json({ message: "Registrasi berhasil", user });
  } catch (err) {
    res.status(400).json({ message: err.message || "Gagal register" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Email tidak terdaftar" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    const payload = { id: user.id, nama: user.nama, email: user.email, role: user.role };
    const token = jwt.sign(payload, SECRET, { expiresIn: "1d" });

    res.json({ message: "Login berhasil", token, role: user.role });
  } catch (err) {
    res.status(400).json({ message: err.message || "Gagal login" });
  }
};

//Profile
export const profile = (req, res) => {
  const user = req.user;
  const id = user.id;
  const nama = user.nama;
  const email = user.email;
  res.json({ id, nama, email });
};
