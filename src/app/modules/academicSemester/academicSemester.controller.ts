import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/Paginationconstants";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { AcademicSemesterService } from "./academicSemester.service";
import { IAcademicSemester } from "./academinSemester.interface";

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester created Successfully",
      data: result,
    });
    next();
  }
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req?.query, paginationFields);
    console.log(paginationOptions);
    const result = await AcademicSemesterService.getAllSemestersService(
      paginationOptions
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semesters fetched Successfully",
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

export const academincSemesterController = { createSemester, getAllSemesters };
