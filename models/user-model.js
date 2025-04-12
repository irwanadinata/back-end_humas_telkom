import db from "./connection.js";

const User = {};

// CREATE (Async/Await)
User.create = async (data) => {
  try {
    // Cek apakah email sudah terdaftar
    const resCheck = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [data.email],
        (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }
      );
    });

    if (resCheck.length > 0) {
      throw new Error("Email sudah terdaftar");
    }

    // Insert user baru
    const resInsert = await new Promise((resolve, reject) => {
      db.query("INSERT INTO users SET ?", data, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });

    return { id: resInsert.insertId, ...data };
  } catch (err) {
    throw err;
  }
};

// GET BY EMAIL (Async/Await)
User.findByEmail = async (email) => {
  try {
    const res = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    if (res.length === 0) {
      throw new Error("User tidak ditemukan");
    }

    return res[0];
  } catch (err) {
    throw err;
  }
};

User.getUserById = (id) => {
  
}

export default User;
