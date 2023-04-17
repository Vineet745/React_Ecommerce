import express from "express"
import { forgotPasswordController, loginController, registerController, testController, updateProfileController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";

// router object

const router = express.Router();

// routing
// Register Post
 router.post("/register",registerController)

//  Login Post
router.post("/login",loginController)

// Forget password

router.post('/forgot-password',forgotPasswordController)


router.get("/test", requireSignIn, isAdmin, testController)

// Protected Route

router.get("/user-auth", requireSignIn, (req,res)=>{res.status(200).send({ok:true}); 
})

// Protected Admin Route


router.get("/admin-auth", requireSignIn, isAdmin,  (req,res)=>{res.status(200).send({ok:true}); 
})


// update Profile
router.put('/profile' , requireSignIn, updateProfileController)
export default router;