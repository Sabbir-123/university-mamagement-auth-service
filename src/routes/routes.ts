import express from "express";
import { AcademicDepartmentRoutes } from "../app/modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../app/modules/academicFaculty/academicFaculty.route";
import { SemesterRoutes } from "../app/modules/academicSemester/academinSemester.route";
import { AdminRoutes } from "../app/modules/admin/admin.routes";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import { ManagementDepartmentRoutes } from "../app/modules/managementDepartment/managementDepartment.route";
import { StudentsRoute } from "../app/modules/students/students.route";
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
  {
    path: "/students/",
    route: StudentsRoute,
  },
  {
    path: "/management-departments",
    route: ManagementDepartmentRoutes,
  },
  {
    path: "/faculties/",
    route: FacultyRoutes,
  },
  {
    path: "/admins/",
    route: AdminRoutes,
  },
  {
    path: "/auth/",
    route: AuthRoutes,
  },
];
moduleRoute.forEach((route) => {
  router.use(route?.path, route?.route);
});

export default router;
