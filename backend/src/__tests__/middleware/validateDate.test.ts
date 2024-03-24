import { Request, Response, NextFunction } from "express";
import validateDate from "../../middleware/validateDate";
import setupTest from "../../util/setupTest";

describe("validateDate middleware", () => {
  const { req, res, next, mockJson } = setupTest();

  it("should call next() when date is valid", () => {
    req.body.dueDate = "2024-01-18";

    validateDate(req as Request, res as Response, next as NextFunction);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(mockJson).not.toHaveBeenCalled();
  });

  it("should return 400 error if the date is invalid", () => {
    req.body.dueDate = "2024-24-00"; // invalid date

    validateDate(req as Request, res as Response, next as NextFunction);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      error: "Invalid dueDate",
    });
  });

  it("should return 400 error if the date is empty string", () => {
    req.body.dueDate = "";

    validateDate(req as Request, res as Response, next as NextFunction);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      error: "Invalid dueDate",
    });
  });

  it("should return 400 error if the date is null", () => {
    req.body.dueDate = null;

    validateDate(req as Request, res as Response, next as NextFunction);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      error: "Invalid dueDate",
    });
  });
});
