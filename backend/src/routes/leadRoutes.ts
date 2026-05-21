import express from "express";

import { createLead, getLeads, getLeadById, updateLead, deleteLead, getAllLeads } from "../controllers/leadController";

import { protect, authorizeRoles } from "../middleware/authMiddleware";

import validate from "../middleware/validate";

import {createLeadSchema} from "../validators/leadValidator";

const router = express.Router();

router.post("/", protect, validate(createLeadSchema) , createLead);

router.get("/all", protect, getAllLeads);

router.get("/", protect, getLeads);

router.get("/:id", protect, getLeadById);

router.put("/:id", protect, updateLead);

router.delete("/:id", protect, authorizeRoles("admin"), deleteLead);

export default router;
