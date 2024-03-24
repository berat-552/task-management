// testUtils.ts

import { Request, Response, NextFunction } from "express";

function setupTest(): {
  req: Partial<Request>;
  res: Partial<Response>;
  next: NextFunction;
  mockJson: jest.Mock;
} {
  let req: Partial<Request> = { body: {} };
  let res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  let next: NextFunction = jest.fn();
  let mockJson: jest.Mock = res.json as jest.Mock;

  return { req, res, next, mockJson };
}

export default setupTest;
