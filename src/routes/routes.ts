import express from "express";
import { AcademicDepartmentRoutes } from "../app/modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../app/modules/academicFaculty/academicFaculty.route";
import { SemesterRoutes } from "../app/modules/academicSemester/academinSemester.route";
import { UserRoutes } from "../app/modules/users/user.route";

const router = express.Router();

const moduleRoute = [
  {
    path: "/users/",
    route: UserRoutes,
  },
  {
    path: "/academic-semester/",
    route: SemesterRoutes,
  },
  {
    path: "/academic-faculty/",
    route: FacultyRoutes,
  },
  {
    path: "/academic-department/",
    route: AcademicDepartmentRoutes,
  },
];
moduleRoute.forEach((route) => {
  router.use(route?.path, route?.route);
});

export default router;
