const db = require("../config/db");
const queryGenerate = require("../utils/query.genereate");

const getPaymentAll = (req, res) => {
  db.query(`SELECT * FROM payment`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.send(result);
  });
};

const getOnePaymentById = (req, res) => {
  let { id } = req.params;
  db.query(`SELECT * FROM payment WHERE id=?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.send(result);
  });
};

const createPayment = (req, res) => {
  const { booking_id, amount, payment_time, payment_method } = req.body;
  db.query(
    `
    INSERT INTO payment (booking_id, amount, payment_time, payment_method)
    VALUES(?, ?, ?, ?)
    `,
    [booking_id, amount, payment_time, payment_method],
    (error, result) => {
      if (error) {
        console.log(`Error adding new payment`, error);
        return res.status(500).send({ message: "Serverda Xatolik" });
      }
      console.log(result);
      res.status(201).send({
        message: "Yangi payment qo'shildi",
        userId: result.insertId,
      });
    }
  );
};

const updatePaymentById = (req, res) => {
  let { id } = req.params;
  let data = req.body;

  let updateValue = queryGenerate(data);
  let values = Object.values(data);
  console.log(updateValue);

  db.query(
    `UPDATE payment SET ${updateValue} WHERE id=?`,
    [...values, id],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` });
      }
      res.status(200).send({ message: "Payment updated successfully" });
    }
  );
};

const removePaymentById = (req, res) => {
  let { id } = req.params;
  db.query(`DELETE FROM payment WHERE id = ?`, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: `${err.message}` });
    }

    res.status(200).send({ message: "Payment deleted successfully" });
  });
};

module.exports = {
  getPaymentAll,
  getOnePaymentById,
  createPayment,
  updatePaymentById,
  removePaymentById,
};
