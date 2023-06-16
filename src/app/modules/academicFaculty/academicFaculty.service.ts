import { SortOrder } from "mongoose";
import {
  IGenericResponse,
  IpaginationOptions,
} from "../../../Interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { academicFacultySearchableFileds } from "./academicFaculty.constant";
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFacultyModel";

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFacultysService = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  //filtering and searching
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];
  // dynamically searching
  if (searchTerm) {
    andCondition.push({
      $or: academicFacultySearchableFileds.map((field) => ({
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

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const updateSingleFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndDelete({ _id: id });
  return result;
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFacultysService,
  getSingleFaculty,
  updateSingleFaculty,
  deleteFaculty,
};
