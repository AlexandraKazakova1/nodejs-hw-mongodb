import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createHttpError(401, 'Not authorized! Token is missing.');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UsersCollection.findById(decoded.id);
    if (!user) {
      throw createHttpError(401, 'User not found!');
    }

    req.user = { _id: user._id };
    next();
  } catch (error) {
    next(createHttpError(401, 'Invalid token!'));
  }
};

export default authMiddleware;
