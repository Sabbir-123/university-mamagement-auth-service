import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterController } from "./academicSemester.controller";
import { AcademicSemesterValidation } from "./academinSemester.validation";

const router = express.Router();

router.post(
  "/create-academicSemester",
  validateRequest(AcademicSemesterValidation?.createAcademicSemesterZodSchema),
  academicSemesterController.createSemester
);
router.get("/", academicSemesterController.getAllSemesters);
router.patch(
  "/:id",
  validateRequest(AcademicSemesterValidation?.updateAcademicSemesterZodSchema),
  academicSemesterController.updateSemester
);
router.delete("/:id", academicSemesterController.deleteSingleSemester);

router.get("/:id", academicSemesterController.getSingleSemester);
export const SemesterRoutes = router;
