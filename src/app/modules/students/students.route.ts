import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import { StudentController } from "./students.controller";
import { StudentValidaion } from "./students.validation";

const router = express.Router();
router.get("/:id", StudentController.getSingleStudent);
router.get("/", StudentController.getAllStudents);
router.delete("/:id", StudentController.deleteStudent);

router.patch(
  "/:id",
  validateRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudent
);

export const StudentsRoute = router;
