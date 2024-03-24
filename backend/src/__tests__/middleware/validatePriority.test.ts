import { NextFunction, Request, Response } from "express";
import validatePriority from "../../middleware/validatePriority";
import Priority from "../../types/enums/Priority";
import setupTest from "../../util/setupTest";

describe("validatePriority middleware", () => {
  const { req, res, next } = setupTest();

  it("should call next() if priority is valid", () => {
    req.body.priority = Priority.High;

    validatePriority(req as Request, res as Response, next as NextFunction);
    expect(next).toHaveBeenCalled();
  });

  it("should return a 400 error if priority is invalid", () => {
    req.body.priority = "InvalidPriority";

    validatePriority(req as Request, res as Response, next as NextFunction);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: `Invalid priority, must be ${Priority.High}, ${Priority.Medium}, or ${Priority.Low}`,
    });
  });

  it("should return a 400 error if priority is missing", () => {
    validatePriority(req as Request, res as Response, next as NextFunction);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should return a 400 error if priority is null", () => {
    req.body.priority = null;

    validatePriority(req as Request, res as Response, next as NextFunction);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: `Invalid priority, must be ${Priority.High}, ${Priority.Medium}, or ${Priority.Low}`,
    });
  });

  it("should return a 400 error if priority is a number", () => {
    req.body.priority = 123;
    validatePriority(req as Request, res as Response, next as NextFunction);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
