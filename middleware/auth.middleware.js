import jwt from "jsonwebtoken";
import roleAccess from "./role-access.js";

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const endpoint = req.baseUrl;
    const method = req.method;

    const isAllowed = roleAccess(decoded.role, endpoint, method);
    if (!isAllowed) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
};

export default auth;
