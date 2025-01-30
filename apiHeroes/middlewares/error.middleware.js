import { ApiError } from "../errors/api.error.js";

export async function errorHandler(error, req, res, next) {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({ error: error.message });
  } else {
    res.status(500).json({ error: error.message });
  }
}
