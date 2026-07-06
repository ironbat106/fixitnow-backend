import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { categoryController } from "../category/category.controller";
import { categoryValidation } from "../category/category.validation";
import { adminController } from "./admin.controller";
import { adminValidation } from "./admin.validation";

const router = Router();

router.get("/users", auth(Role.ADMIN), adminController.getUsers);
router.patch("/users/:id/status", auth(Role.ADMIN), validateRequest(adminValidation.updateUserStatus), adminController.updateUserStatus);
router.get("/bookings", auth(Role.ADMIN), adminController.getAllBookings);
router.get("/payments", auth(Role.ADMIN), adminController.getAllPayments);
router.get("/categories", auth(Role.ADMIN), categoryController.getAll);
router.post("/categories", auth(Role.ADMIN), validateRequest(categoryValidation.create), categoryController.create);

export const adminRoutes = router;
