const {
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
} = require("../controllers/users.controller");

const router = require("express").Router();

router.post("/create", createUser);
router.get("/all", callProcedureUsers);
router.get("/role", getUserByRole);
router.get("/any", getUsersByAnyParams);
router.get("/ownerstadiums", findOwnerStadiums);
router.get("/getReview", getUserReviews);
router.get("/:id", getUserById);
router.delete("/:id", removeUserById);
router.patch("/:id", updateUserById);

module.exports = router;
