import express from "express";
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
];
moduleRoute.forEach((route) => {
  router.use(route?.path, route?.route);
});

export default router;
