const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  FORBIDDEN: 403,
};

class AppError extends Error {
  statusCode: number;
  description: string;
  constructor(code: number, desc: string) {
    super(desc);
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = code;
    this.description = desc;
  }
}

export { AppError, STATUS_CODES };
