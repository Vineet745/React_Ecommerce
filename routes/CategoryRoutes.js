import express from "express";
import {isAdmin, requireSignIn} from "./../Middlewares/authMiddleware.js"
import { CreateCategoryController, DeleteCategory, SingleCategoryController, categoryController, updateCategoryController } from "../controllers/CategoryController.js"
const router = express.Router()

// Routes
// Create-Category
router.post('/create-category', requireSignIn, isAdmin, CreateCategoryController)

// Update-Category

router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

// Get all Category
router.get('/get-category', categoryController)

// Single Category
router.get('/single-category/:slug',SingleCategoryController)

// Delete Category
router.delete('/delete-category/:id', requireSignIn, isAdmin ,DeleteCategory)








export default router

