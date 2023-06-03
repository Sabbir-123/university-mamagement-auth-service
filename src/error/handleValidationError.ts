import mongoose from "mongoose";
import { IGenericErrorMessage } from "../Interfaces/error";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errors: IGenericErrorMessage[] = Object.values(err?.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return { path: el?.path, message: el?.message };
    }
  );
  // const statusCode = 400;
  return errors;
};

export default handleValidationError;
