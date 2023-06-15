import {
  IAcademinSemesterCode,
  IAcademinSemesterMonth,
  IAcademinSemesterTitle,
} from "./academinSemester.interface";

export const academicSemesterTitles: IAcademinSemesterTitle[] = [
  "Autumn",
  "Spring",
  "Fall",
];

export const academicSemesterCodes: IAcademinSemesterCode[] = [
  "01",
  "02",
  "03",
];

export const academicSemesterMonths: IAcademinSemesterMonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: "01",
  Spring: "02",
  Fall: "03",
};

export const academicSemecterSearchableFileds = ["title", "code", "year"];
export const filterableFields = ["searchTerm", "title", "code", "year"];
