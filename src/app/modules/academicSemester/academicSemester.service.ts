import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { AcademicSemester } from "./academicSemesterModel";
import { academicSemesterTitleCodeMapper } from "./academinSemester.constant";
import { IAcademicSemester } from "./academinSemester.interface";

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload?.title] !== payload?.code) {
    throw new ApiError("Invalid Semester code", httpStatus.BAD_REQUEST);
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = { createSemester };
