import { Request, Response, NextFunction } from "express";
import validateFields from "../../middleware/validateFields";
import { requiredFieldsCreate, requiredFieldsLogin } from "../../constants";
import setupTest from "../../util/setupTest";

describe("validateFields middleware", () => {
  const { req, res, next, mockJson } = setupTest();

  it("should call next() if all required fields are present", () => {
    const middleware = validateFields(requiredFieldsLogin);
    req.body = { email: "janeDoe@gmail.com", password: "janeDoe213?" };

    middleware(req as Request, res as Response, next as NextFunction);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(mockJson).not.toHaveBeenCalled();
  });

  it("should return 400 error with missing fields if any required field is missing", () => {
    const middleware = validateFields(requiredFieldsLogin);
    req.body = { email: "janeDoe@gmail.com" };

    const missingFields = requiredFieldsLogin.filter(
      (field) => !(field in req.body)
    );

    middleware(req as Request, res as Response, next as NextFunction);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      status: 400,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  });

  it("should return 400 with multiple missing fields if multiple required fields are missing", () => {
    const middleware = validateFields(requiredFieldsCreate);
    req.body = { content: "task content" };

    const missingFields = requiredFieldsCreate.filter(
      (field) => !(field in req.body)
    );

    middleware(req as Request, res as Response, next as NextFunction);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      status: 400,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  });
});
