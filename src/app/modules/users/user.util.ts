import { IAcademicSemester } from "../academicSemester/academinSemester.interface";
import { User } from "./user.model";

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: "Student" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(5) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, "0"); //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  //20 25
  incrementedId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementedId}`;

  return incrementedId;
};
export const findLastFacultytId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(3) : undefined;
};

export const generateFacultytId = async () => {
  const currentId = (await findLastFacultytId()) || (0).toString();
  let increamentedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  increamentedId = `F-${increamentedId}`;
  console.log(increamentedId);
  return increamentedId;
};
