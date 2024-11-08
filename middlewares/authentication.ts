import express from 'express';
import createError from 'http-errors';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

import User from '../models/User';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'phuktvn';

function verifyToken(token: string): Promise<jwt.JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          reject(createError(httpStatus.UNAUTHORIZED, 'Token Expired!'));
        } else {
          reject(createError(httpStatus.UNAUTHORIZED, 'Token Invalid!'));
        }
      } else {
        resolve(payload as jwt.JwtPayload);
      }
    });
  });
}

export async function protect(
  req: express.Request & { user?: any },
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw createError(httpStatus.UNAUTHORIZED, 'Login Required!');
    }
    const token = tokenString.replace('Bearer ', '');
    const payload = await verifyToken(token);
    const user = await User.findById(payload.id);
    
    if (!user) {
      throw createError(httpStatus.UNAUTHORIZED, 'User not found!');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
