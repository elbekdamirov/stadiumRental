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
    `select s.name,s.address, s.location, s.price,  b.start_time, b.end_time from stadium s
     join booking b on s.id = b.stadion_id
     where s.price > ${start_price} and s.price < ${end_price} and 
     TIME_TO_SEC(TIMEDIFF(b.end_time, b.start_time)) >= 3600*2`,
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
