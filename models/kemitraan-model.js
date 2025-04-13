import db from "./connection.js";

const Kemitraan = {};

// GET ALL
Kemitraan.getAll = async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM kemitraan ORDER BY created_at DESC", (err, res) => {
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
Kemitraan.getById = async (id) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM kemitraan WHERE id = ?",
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
Kemitraan.getByUser = async (userId) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM kemitraan WHERE user_id = ? ORDER BY created_at DESC",
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
Kemitraan.create = async (data) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("INSERT INTO kemitraan SET ?", data, (err, res) => {
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
Kemitraan.update = async (id, data) => {
  try {
    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE kemitraan SET ? WHERE id = ?",
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
Kemitraan.delete = async (id) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM kemitraan WHERE id = ?",
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
Kemitraan.getTotal = async () => {
  try {
    const total = await new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) AS total FROM kemitraan",
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

export default Kemitraan;
