import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/Paginationconstants";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicFacultyFilterableFileds } from "./academicFaculty.constant";
import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFacultyService } from "./academicFaculty.service";

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty created Successfully",
    data: result,
  });
});

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  console.log(req.headers.authorization);
  console.log(req.user);
  // searching, filtering and pagination
  const filters = pick(req?.query, academicFacultyFilterableFileds);
  const paginationOptions = pick(req?.query, paginationFields);
  const result = await AcademicFacultyService.getAllFacultysService(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facultys fetched Successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.getSingleFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty fetched Successfully",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  const updatedData = req?.body;
  const result = await AcademicFacultyService.updateSingleFaculty(
    id,
    updatedData
  );
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty Updated Successfully",
    data: result,
  });
});

const deleteSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.deleteFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty Deleted Successfully",
    data: result,
  });
});

export const academicFacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteSingleFaculty,
};
