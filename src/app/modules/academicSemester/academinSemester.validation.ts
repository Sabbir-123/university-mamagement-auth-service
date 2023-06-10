import { z } from "zod";
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from "./academinSemester.constant";

const createAcademinSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: "Title is requirer",
    }),
    year: z.number({
      required_error: "Year is required",
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: "Start Month is required",
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: "End Month is required",
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademinSemesterZodSchema,
};
