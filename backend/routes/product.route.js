import express from 'express'
import authMiddleware from "../middleware/authMiddleware";
const router = express.Router();
import  {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import upload from '../utils/fileUpload.js';

router.post("/", authMiddleware, upload.single("image"), createProduct);
router.patch("/:id", authMiddleware, upload.single("image"), updateProduct);
router.get("/", authMiddleware, getProducts);
router.get("/:id", authMiddleware, getProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;