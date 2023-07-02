import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyController } from "./academicFaculty.controller";
import { AcademicFacultyValidation } from "./academicFaculty.validation";

const router = express.Router();

router.post(
  "/create-academicFaculty",
  validateRequest(AcademicFacultyValidation?.createAcademicFacultyZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  academicFacultyController.createFaculty
);
router.patch(
  "/:id",
  validateRequest(AcademicFacultyValidation?.updateAcademicFacultyZodSchema),
  auth(
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  academicFacultyController.updateFaculty
);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  academicFacultyController.deleteSingleFaculty
);

router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY, ENUM_USER_ROLE.STUDENT),
  academicFacultyController.getSingleFaculty
);

router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY, ENUM_USER_ROLE.STUDENT),
  academicFacultyController.getAllFaculty
);

export const FacultyRoutes = router;
