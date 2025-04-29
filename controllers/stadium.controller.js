const db = require("../config/db");
const queryGenerate = require("../utils/query.genereate");

const getStadiumAll = (req, res) => {
  db.query(`SELECT * FROM stadium`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.send(result);
  });
};

const getOneStadiumById = (req, res) => {
  let { id } = req.params;
  db.query(`SELECT * FROM stadium WHERE id=?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.send(result);
  });
};

const createStadium = (req, res) => {
  const { name, address, location, description, price, ownerId } = req.body;
  db.query(
    `
    INSERT INTO stadium (name, address, location, description, price, ownerId)
    VALUES(?, ?, ?, ?, ?, ?)
    `,
    [name, address, location, description, price, ownerId],
    (error, result) => {
      if (error) {
        console.log(`Error adding new stadium`, error);
        return res.status(500).send({ message: "Serverda Xatolik" });
      }
      console.log(result);
      res.status(201).send({
        message: "Yangi stadium qo'shildi",
        userId: result.insertId,
      });
    }
  );
};

const updateStadiumById = (req, res) => {
  let { id } = req.params;
  let data = req.body;

  let updateValue = queryGenerate(data);
  let values = Object.values(data);
  console.log(updateValue);

  db.query(
    `UPDATE stadium SET ${updateValue} WHERE id=?`,
    [...values, id],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` });
      }
      res.status(200).send({ message: "Stadium updated successfully" });
    }
  );
};

const removeStadiumById = (req, res) => {
  let { id } = req.params;
  db.query(`DELETE FROM stadium WHERE id = ?`, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: `${err.message}` });
    }

    res.status(200).send({ message: "Stadium deleted successfully" });
  });
};

const getStadiumByPrice = (req, res) => {
  db.query(
    `SELECT s.name, s.location, s.price, b.start_time, b.end_time FROM stadium s
    LEFT JOIN booking b ON b.stadion_id = s.id
    WHERE price BETWEEN 3000 AND 5000 AND end_time - start_time >= 2`,
    (error, result) => {
      if (error) {
        console.log(`Error get all users by phone`, error);
        return res.status(500).send({ message: "Serverda xatolik" });
      }
      res.send(result);
    }
  );
};

module.exports = {
  getStadiumAll,
  getOneStadiumById,
  createStadium,
  updateStadiumById,
  removeStadiumById,
  getStadiumByPrice,
};
