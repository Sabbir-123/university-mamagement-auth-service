import httpStatus from "http-status";
import {
  IGenericResponse,
  IpaginationOptions,
} from "../../../Interfaces/common";
import ApiError from "../../../error/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
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

const getAllSemestersService = async (
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const result = await AcademicSemester.find().sort().skip(skip).limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemestersService,
};
