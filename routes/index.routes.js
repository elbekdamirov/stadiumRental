const router = require("express").Router();
const bookingRouter = require("./booking.routes");
const imageRouter = require("./images.routes");
const paymentRouter = require("./payment.routes");
const reviewRouter = require("./review.routes");
const stadiumRouter = require("./stadium.routes");
const usersRouter = require("./users.routes");

router.use("/users", usersRouter);
router.use("/stadium", stadiumRouter);
router.use("/booking", bookingRouter);
router.use("/payment", paymentRouter);
router.use("/review", reviewRouter);
router.use("/image", imageRouter);

module.exports = router;
