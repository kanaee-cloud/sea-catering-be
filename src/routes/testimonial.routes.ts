import { Router } from "express";
import { handleCreateTestimonial, handleGetTestimonials } from "../controllers/testimonial.controller";

const router = Router();

router.post("/", handleCreateTestimonial);
router.get("/", handleGetTestimonials)

export default router;
