import db from "./connection.js";

const LiputanKegiatan = {};

// GET ALL
LiputanKegiatan.getAll = async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM liputan_kegiatan ORDER BY created_at DESC", (err, res) => {
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
LiputanKegiatan.getById = async (id) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM liputan_kegiatan WHERE id = ?",
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
LiputanKegiatan.getByUser = async (userId) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM liputan_kegiatan WHERE user_id = ? ORDER BY created_at DESC",
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
LiputanKegiatan.create = async (data) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("INSERT INTO liputan_kegiatan SET ?", data, (err, res) => {
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
LiputanKegiatan.update = async (id, data) => {
  try {
    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE liputan_kegiatan SET ? WHERE id = ?",
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
LiputanKegiatan.delete = async (id) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM liputan_kegiatan WHERE id = ?",
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
LiputanKegiatan.getTotal = async () => {
  try {
    const total = await new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) AS total FROM liputan_kegiatan",
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

export default LiputanKegiatan;
