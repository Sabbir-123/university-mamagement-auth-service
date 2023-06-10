import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academincSemesterController } from "./academicSemester.controller";
import { AcademicSemesterValidation } from "./academinSemester.validation";

const router = express.Router();

router.post(
  "/create-academicSemester",
  validateRequest(AcademicSemesterValidation?.createAcademinSemesterZodSchema),
  academincSemesterController.createSemester
);

export const SemesterRoutes = router;
