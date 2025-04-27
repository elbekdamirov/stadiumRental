const db = require("../config/db");
const queryGenerate = require("../utils/query.genereate");

const getReviewAll = (req, res) => {
  db.query(`SELECT * FROM review`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.send(result);
  });
};

const getOneReviewById = (req, res) => {
  let { id } = req.params;
  db.query(`SELECT * FROM review WHERE id=?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.send(result);
  });
};

const createReview = (req, res) => {
  const { stadion_id, user_id, rating, comment } = req.body;
  db.query(
    `
    INSERT INTO review (stadion_id, user_id, rating, comment)
    VALUES(?, ?, ?, ?)
    `,
    [stadion_id, user_id, rating, comment],
    (error, result) => {
      if (error) {
        console.log(`Error adding new review`, error);
        return res.status(500).send({ message: "Serverda Xatolik" });
      }
      console.log(result);
      res.status(201).send({
        message: "Yangi review qo'shildi",
        userId: result.insertId,
      });
    }
  );
};

const updateReviewById = (req, res) => {
  let { id } = req.params;
  let data = req.body;

  let updateValue = queryGenerate(data);
  let values = Object.values(data);
  console.log(updateValue);

  db.query(
    `UPDATE review SET ${updateValue} WHERE id=?`,
    [...values, id],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` });
      }
      res.status(200).send({ message: "Review updated successfully" });
    }
  );
};

const removeReviewById = (req, res) => {
  let { id } = req.params;
  db.query(`DELETE FROM review WHERE id = ?`, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: `${err.message}` });
    }

    res.status(200).send({ message: "Review deleted successfully" });
  });
};

module.exports = {
  getReviewAll,
  getOneReviewById,
  createReview,
  updateReviewById,
  removeReviewById,
};
