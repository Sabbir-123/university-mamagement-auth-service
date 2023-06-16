import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyController } from "./academicFaculty.controller";
import { AcademicFacultyValidation } from "./academicFaculty.validation";

const router = express.Router();

router.post(
  "/create-academicFaculty",
  validateRequest(AcademicFacultyValidation?.createAcademicFacultyZodSchema),
  academicFacultyController.createFaculty
);
router.patch(
  "/:id",
  validateRequest(AcademicFacultyValidation?.updateAcademicFacultyZodSchema),
  academicFacultyController.updateFaculty
);
router.delete("/:id", academicFacultyController.deleteSingleFaculty);

router.get("/:id", academicFacultyController.getSingleFaculty);

router.get("/", academicFacultyController.getAllFaculty);

export const FacultyRoutes = router;
