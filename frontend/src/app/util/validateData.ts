import userSchema from "../zodSchemas/userSchema";

const validateData = (dataToValidate: object) => {
  const result = userSchema.safeParse(dataToValidate);

  if (result.success) {
    return { isValid: true, errors: {} };
  } else {
    const validationErrors: Record<string, string> = {};

    result.error.errors.forEach((err) => {
      validationErrors[err.path.join(".")] = err.message;
    });

    return { isValid: false, errors: validationErrors };
  }
};

export default validateData;
