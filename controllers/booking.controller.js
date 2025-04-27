const db = require("../config/db");
const queryGenerate = require("../utils/query.genereate");

const getBookingAll = (req, res) => {
  db.query(`SELECT * FROM booking`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.send(result);
  });
};

const getOneBookingById = (req, res) => {
  let { id } = req.params;
  db.query(`SELECT * FROM booking WHERE id=?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.send(result);
  });
};

const createBooking = (req, res) => {
  const {
    stadion_id,
    user_id,
    booking_date,
    start_time,
    end_time,
    total_price,
    status,
  } = req.body;
  db.query(
    `
    INSERT INTO booking (stadion_id, user_id, booking_date, start_time, end_time, total_price, status)
    VALUES(?, ?, ?, ?, ?, ?, ?)
    `,
    [
      stadion_id,
      user_id,
      booking_date,
      start_time,
      end_time,
      total_price,
      status,
    ],
    (error, result) => {
      if (error) {
        console.log(`Error adding new booking`, error);
        return res.status(500).send({ message: "Serverda Xatolik" });
      }
      console.log(result);
      res.status(201).send({
        message: "Yangi booking qo'shildi",
        userId: result.insertId,
      });
    }
  );
};

const updateBookingById = (req, res) => {
  let { id } = req.params;
  let data = req.body;

  let updateValue = queryGenerate(data);
  let values = Object.values(data);

  db.query(
    `UPDATE booking SET ${updateValue} WHERE id=?`,
    [...values, id],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` });
      }
      res.status(200).send({ message: "Booking updated successfully" });
    }
  );
};

const removeBookingById = (req, res) => {
  let { id } = req.params;
  db.query(`DELETE FROM booking WHERE id = ?`, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: `${err.message}` });
    }

    res.status(200).send({ message: "Booking deleted successfully" });
  });
};

module.exports = {
  getBookingAll,
  removeBookingById,
  updateBookingById,
  getOneBookingById,
  updateBookingById,
  createBooking,
};
