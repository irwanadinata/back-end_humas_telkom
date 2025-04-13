import db from "./connection.js";

const PenerbitanBerita = {};

// GET ALL
PenerbitanBerita.getAll = async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM penerbitan_berita ORDER BY created_at DESC", (err, res) => {
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
PenerbitanBerita.getById = async (id) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM penerbitan_berita WHERE id = ?",
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
PenerbitanBerita.getByUser = async (userId) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM penerbitan_berita WHERE user_id = ? ORDER BY created_at DESC",
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
PenerbitanBerita.create = async (data) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("INSERT INTO penerbitan_berita SET ?", data, (err, res) => {
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
PenerbitanBerita.update = async (id, data) => {
  try {
    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE penerbitan_berita SET ? WHERE id = ?",
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
PenerbitanBerita.delete = async (id) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM penerbitan_berita WHERE id = ?",
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
PenerbitanBerita.getTotal = async () => {
  try {
    const total = await new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) AS total FROM penerbitan_berita",
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

export default PenerbitanBerita;
