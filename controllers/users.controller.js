const db = require("../config/db");
const queryGenerate = require("../utils/query.genereate");

//params, body, query
const createUser = (req, res) => {
  const { first_name, last_name, email, password, phone, role } = req.body;
  db.query(
    `
        INSERT INTO users (first_name, last_name, email, password, phone, role)
        VALUES(?, ?, ?, ?, ?, ?)
    `,
    [first_name, last_name, email, password, phone, role],
    (error, result) => {
      if (error) {
        console.log(`Error adding new user`, error);
        return res.status(500).send({ message: "Serverda Xatolik" });
      }
      console.log(result);
      res.status(201).send({
        message: "Yangi user qo'shildi",
        userId: result.insertId,
      });
    }
  );
};

const getAllUsers = (req, res) => {
  db.query(`SELECT * FROM users`, (error, result) => {
    if (error) {
      console.log(`Error get all users`, error);
      return res.status(500).send({ message: "Serverda xatolik" });
    }
    res.send(result);
  });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM users WHERE id=${id}`, (error, result) => {
    if (error) {
      console.log(`Error get all users`, error);
      return res.status(500).send({ message: "Serverda xatolik" });
    }
    res.send(result);
  });
};

const removeUserById = (req, res) => {
  let { id } = req.params;
  db.query(`DELETE FROM users WHERE id = ?`, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: `${err.message}` });
    }

    res.status(200).send({ message: "User deleted successfully" });
  });
};

const updateUserById = (req, res) => {
  let { id } = req.params;
  let data = req.body;

  let updateValue = queryGenerate(data);
  let values = Object.values(data);
  console.log(updateValue);

  db.query(
    `UPDATE users SET ${updateValue} WHERE id=?`,
    [...values, id],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` });
      }
      res.status(200).send({ message: "User updated successfully" });
    }
  );
};

const getUserByRole = (req, res) => {
  const { role } = req.body;

  db.query(`SELECT * FROM users WHERE role=?`, [role], (error, result) => {
    if (error) {
      console.log(`Error get all users by role`, error);
      return res.status(500).send({ message: "Serverda xatolik" });
    }
    res.send(result);
  });
};

const getUsersByAnyParams = (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  let where = "true";
  if (first_name) {
    where += ` AND first_name='${first_name}'`;
  }
  if (last_name) {
    where += ` AND last_name like '%${last_name}'`;
  }
  if (email) {
    where += ` AND email like '%${email}'`;
  }
  if (phone) {
    where += ` AND phone like '%${phone}'`;
  }
  if (where == "true") {
    return res
      .status(400)
      .send({ message: "Qidirish paramaetrlarini kiriting" });
  }
  db.query(`SELECT * FROM users WHERE ${where}`, (error, result) => {
    if (error) {
      console.log(`Error get users`, error);
      return res.status(500).send({ message: "Serverda xatolik" });
    }
    res.send(result);
  });
};

const findOwnerStadiums = (req, res) => {
  const { first_name, last_name } = req.body;

  db.query(
    `SELECT u.first_name, u.phone, s.name, i.image_url FROM users u
    LEFT JOIN stadium s ON u.id = s.owner_id
    LEFT JOIN images i ON s.id = i.stadion_id
    WHERE first_name='${first_name}' AND last_name = '${last_name}'`,
    (error, result) => {
      if (error) {
        console.log(`Error get all users by role`, error);
        return res.status(500).send({ message: "Serverda xatolik" });
      }
      res.send(result);
    }
  );
};

const getUserReviews = (req, res) => {
  const { phone } = req.body;

  db.query(
    `SELECT u.first_name, u.phone, s.name, r.rating, r.comment FROM users u
    LEFT JOIN review r ON r.user_id = u.id
    LEFT JOIN stadium s ON s.id = r.stadion_id
    WHERE phone='${phone}'`,
    (error, result) => {
      if (error) {
        console.log(`Error get all users by phone`, error);
        return res.status(500).send({ message: "Serverda xatolik" });
      }
      res.send(result);
    }
  );
};

const callProcedureUsers = (req, res) => {
  db.query("call getAllUsers()", (error, result) => {
    if (error) {
      console.log(`Error get all users`, error);
      return res.status(500).send({ message: "Serverda xatolik" });
    }
    res.send(result[0]);
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  removeUserById,
  updateUserById,
  getUserByRole,
  getUsersByAnyParams,
  findOwnerStadiums,
  getUserReviews,
  callProcedureUsers,
};
