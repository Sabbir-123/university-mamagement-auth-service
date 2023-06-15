import { Model } from "mongoose";
export type IAcademinSemesterMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type IAcademinSemesterTitle = "Autumn" | "Spring" | "Fall";
export type IAcademinSemesterCode = "01" | "02" | "03";

export type IAcademicSemester = {
  title: IAcademinSemesterTitle;
  year: string;
  code: IAcademinSemesterCode;
  startMonth: IAcademinSemesterMonth;
  endMonth: IAcademinSemesterMonth;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;

export type IAcademicSemesterFilter = {
  searchTerm?: string;
};
