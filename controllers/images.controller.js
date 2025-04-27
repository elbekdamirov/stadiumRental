const db = require("../config/db");
const queryGenerate = require("../utils/query.genereate");

const getImagesAll = (req, res) => {
  db.query(`SELECT * FROM images`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.send(result);
  });
};

const getOneImageById = (req, res) => {
  let { id } = req.params;
  db.query(`SELECT * FROM images WHERE id=?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.send(result);
  });
};

const createImage = (req, res) => {
  const { stadion_id, image_url } = req.body;
  db.query(
    `
    INSERT INTO images (stadion_id, image_url)
    VALUES(?, ?)
    `,
    [stadion_id, image_url],
    (error, result) => {
      if (error) {
        console.log(`Error adding new images`, error);
        return res.status(500).send({ message: "Serverda Xatolik" });
      }
      console.log(result);
      res.status(201).send({
        message: "Yangi images qo'shildi",
        userId: result.insertId,
      });
    }
  );
};

const updateImageById = (req, res) => {
  let { id } = req.params;
  let data = req.body;

  let updateValue = queryGenerate(data);
  let values = Object.values(data);
  console.log(updateValue);

  db.query(
    `UPDATE images SET ${updateValue} WHERE id=?`,
    [...values, id],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` });
      }
      res.status(200).send({ message: "Image updated successfully" });
    }
  );
};

const removeImageById = (req, res) => {
  let { id } = req.params;
  db.query(`DELETE FROM images WHERE id = ?`, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: `${err.message}` });
    }

    res.status(200).send({ message: "Image deleted successfully" });
  });
};

module.exports = {
  getImagesAll,
  getOneImageById,
  createImage,
  updateImageById,
  removeImageById,
};
