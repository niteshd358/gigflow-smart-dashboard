import express from "express";

import { registerUser, loginUser } from "../controllers/authController";

import { protect, authorizeRoles } from "../middleware/authMiddleware";

import validate from "../middleware/validate";

import { registerSchema, loginSchema } from "../validators/authValidator";


const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);

router.post("/login", validate(loginSchema) , loginUser);


// CREATE  PROTECTED TEST ROUTE
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});


//ADD ADMIN ROUTE
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
    res.json({
        message: " Welcome admin.. ",
    });
});




export default router;

