import mongoose from "mongoose";
import config from "../../../config/index";
import ApiError from "../../../error/ApiError";
import { AcademicSemester } from "../academicSemester/academicSemesterModel";
import { IStudent } from "../students/students.interface";

import httpStatus from "http-status";
import { Student } from "../students/students.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.util";

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // auto generated increamental id

  // deault password
  if (!user?.password) {
    user.password = config?.default_Student_Pass as string;
  }
  user.role = "student";

  const academicSemester = await AcademicSemester.findById(
    student?.academicSemester
  );
  const session = await mongoose.startSession();
  let newUserAllData = null;
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    //array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError("Failed to create Student", httpStatus.BAD_REQUEST);
    }

    //set student ---> _id into user.student
    // student create howar por student _id ta user.student te set kore ref hishbe use kora hcche
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError("Failed to create User", httpStatus.BAD_REQUEST);
    }

    newUserAllData = newUser[0];

    console.log("newUser", newUser, "newStudent", newStudent);
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: "student",
      populate: [
        {
          path: "academicSemester",
        },
        {
          path: "academicDepartment",
        },
        {
          path: "academicFaculty",
        },
      ],
    });
  }
  return newUserAllData;
};

export const UserService = {
  createStudent,
};
