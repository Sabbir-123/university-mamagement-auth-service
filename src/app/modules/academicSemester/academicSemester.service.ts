import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import {
  IGenericResponse,
  IpaginationOptions,
} from "../../../Interfaces/common";
import ApiError from "../../../error/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { AcademicSemester } from "./academicSemesterModel";
import {
  academicSemecterSearchableFileds,
  academicSemesterTitleCodeMapper,
} from "./academinSemester.constant";
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from "./academinSemester.interface";

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
  filters: IAcademicSemesterFilter,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  //filtering and searching
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];
  // dynamically searching
  if (searchTerm) {
    andCondition.push({
      $or: academicSemecterSearchableFileds.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  // dynamically filtering
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // const andCondition = [
  //  { $or: [
  //     {
  //       title: {
  //         $regex: searchTerm,
  //         $options: "i",
  //      }
  //    }, {
  //      code: {
  //        $regex: searchTerm,
  //        $options: "i",
  //      }
  //    }, {
  //      year: {
  //        $regex: parseInt (searchTerm),

  //      }
  //    }
  //   ]
  //   }
  // ]

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const result = await AcademicSemester.find({ $and: andCondition })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
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
