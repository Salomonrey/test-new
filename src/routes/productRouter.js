import Router from "express";
import multer from "multer";

import {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  uploadProductImage,
} from "../controllers/productController";

const upload = multer({ dest: "upload" });

const router = new Router();

//Add routes for product entity
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.patch("/", updateProduct);
router.post("/upload", upload.single("file"), uploadProductImage);

export default router;
