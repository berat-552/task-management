import { constants } from "../../constants";
import errorHandler from "../../middleware/errorHandler";
import { Request, Response, NextFunction } from "express";
import setupTest from "../../util/setupTest";

describe("errorHandler middleware", () => {
  it("should handle NOT_FOUND error", () => {
    const { req, res, next } = setupTest();

    const err = new Error("Not found");
    res.statusCode = constants.NOT_FOUND;

    errorHandler(err, req as Request, res as Response, next as NextFunction);

    expect(res.statusCode).toBe(404);
    expect(res.json).toHaveBeenCalledWith({
      title: "Not found",
      message: err.message,
      stackTrace: err.stack,
    });
  });

  it("should handle BAD_REQUEST error", () => {
    const { req, res, next } = setupTest();

    const err = new Error("Bad request");
    res.statusCode = constants.BAD_REQUEST;

    errorHandler(err, req as Request, res as Response, next as NextFunction);

    expect(res.statusCode).toBe(400);
    expect(res.json).toHaveBeenCalledWith({
      title: "Validation failed",
      message: err.message,
      stackTrace: err.stack,
    });
  });

  it("should handle FORBIDDEN error", () => {
    const { req, res, next } = setupTest();

    const err = new Error("Forbidden");
    res.statusCode = constants.FORBIDDEN;

    errorHandler(err, req as Request, res as Response, next as NextFunction);

    expect(res.statusCode).toBe(403);
    expect(res.json).toHaveBeenCalledWith({
      title: "Not allowed",
      message: err.message,
      stackTrace: err.stack,
    });
  });

  it("should handle UNAUTHORIZED error", () => {
    const { req, res, next } = setupTest();

    const err = new Error("Unauthorized");
    res.statusCode = constants.UNAUTHORIZED;

    errorHandler(err, req as Request, res as Response, next as NextFunction);

    expect(res.statusCode).toBe(401);
    expect(res.json).toHaveBeenCalledWith({
      title: "Unauthorized access",
      message: err.message,
      stackTrace: err.stack,
    });
  });

  it("should handle INTERNAL_SERVER_ERROR error", () => {
    const { req, res, next } = setupTest();

    const err = new Error("Internal Server Error");
    res.statusCode = constants.INTERNAL_SERVER_ERROR;

    errorHandler(err, req as Request, res as Response, next as NextFunction);

    expect(res.statusCode).toBe(500);
    expect(res.json).toHaveBeenCalledWith({
      title: "Internal Server Error",
      message: err.message,
      stackTrace: err.stack,
    });
  });
});
