import express from "express";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";
import {
  ProductCategoryController,
  RelatedProductController,
  braintreePaymentsController,
  braintreeTokenController,
  createProductController,
  deleteProduct,
  getProductController,
  getSingleProductController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  searchProductController,
  updateProductController,
} from "../controllers/ProductController.js";
import formidable from "express-formidable";
const router = express.Router();

// Create Product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Get Product
router.get("/get-product", getProductController);

// Single Product
router.get("/get-product/:slug", getSingleProductController);

// Product Photo
router.get("/product-photo/:pid", productPhotoController);

// Delete Product
router.delete("/delete-product/:id", deleteProduct);

// Update Product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// Filter Product
router.post("/product-filters", productFiltersController);

// product Count
router.get("/product-count", productCountController);

// Product per Page
router.get("/product-list/:page", productListController);

// Search Controller
router.get("/search/:keyword", searchProductController);

// Search Controller
router.get("/related-product/:pid/:cid", RelatedProductController);

// Category Wise product
router.get("/product-category/:slug", ProductCategoryController);


// Payment Routes
// token
router.get('/braintree/token', braintreeTokenController)

// payments
router.post('/braintree/payment', requireSignIn, braintreePaymentsController)
export default router;
