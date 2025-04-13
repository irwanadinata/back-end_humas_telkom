import db from "./connection.js";

const PeminjamanAlat = {};

// GET ALL
PeminjamanAlat.getAll = async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM peminjaman_alat ORDER BY created_at DESC", (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// GET BY ID
PeminjamanAlat.getById = async (id) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM peminjaman_alat WHERE id = ?",
        [id],
        (err, res) => {
          if (err) return reject(err);
          resolve(res[0]);
        }
      );
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// GET BY USER
PeminjamanAlat.getByUser = async (userId) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM peminjaman_alat WHERE user_id = ? ORDER BY created_at DESC",
        [userId],
        (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }
      );
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// CREATE
PeminjamanAlat.create = async (data) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("INSERT INTO peminjaman_alat SET ?", data, (err, res) => {
        if (err) return reject(err);
        resolve({ id: res.insertId, ...data });
      });
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// UPDATE
PeminjamanAlat.update = async (id, data) => {
  try {
    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE peminjaman_alat SET ? WHERE id = ?",
        [data, id],
        (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }
      );
    });
    return { id, ...data };
  } catch (err) {
    throw err;
  }
};

// DELETE
PeminjamanAlat.delete = async (id) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM peminjaman_alat WHERE id = ?",
        [id],
        (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }
      );
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// GET TOTAL DATA
PeminjamanAlat.getTotal = async () => {
  try {
    const total = await new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) AS total FROM peminjaman_alat",
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows[0].total);
        }
      );
    });
    return total;
  } catch (err) {
    throw err;
  }
};

export default PeminjamanAlat;
