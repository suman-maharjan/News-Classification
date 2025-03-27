import { Schema } from "zod";
import { ApiError } from "../utils/ApiError"; // Assuming your custom error is here

/**
 * A global validation handler function for Zod validation.
 * This wraps the validation logic and throws a formatted error if validation fails.
 *
 * @param schema - The Zod schema to validate against.
 * @param data - The data to validate.
 * @throws ApiError - If validation fails, throws a custom ApiError.
 */
export function validateZod(schema: Schema, data: any) {
  const validationResult = schema.safeParse(data);

  if (!validationResult.success) {
    const validationErrors = validationResult.error.errors.map(
      (issue) => `${issue.message} at ${issue.path.join(".")}`
    );

    // Throw a custom ApiError with the validation errors
    throw new ApiError(400, "Validation Error", validationErrors);
  }

  return validationResult.data; // Return the validated data if no errors
}
