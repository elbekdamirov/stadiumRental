const { Router } = require("express");
const {
  getImagesAll,
  getOneImageById,
  createImage,
  updateImageById,
  removeImageById,
} = require("../controllers/images.controller");

let imageRouter = Router();

imageRouter.get("/all", getImagesAll);
imageRouter.get("/:id", getOneImageById);
imageRouter.post("/create", createImage);
imageRouter.patch("/:id", updateImageById);
imageRouter.delete("/:id", removeImageById);

module.exports = imageRouter;
