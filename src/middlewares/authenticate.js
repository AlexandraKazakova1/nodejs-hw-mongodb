import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      return next(createHttpError(401, 'Please provide Authorization header'));
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return next(createHttpError(401, 'Auth header should be of type Bearer'));
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return next(createHttpError(401, 'Invalid token'));
    }

    const session = await SessionsCollection.findOne({ accessToken: token });

    if (!session) {
      return next(createHttpError(401, 'Session not found'));
    }

    if (new Date() > new Date(session.accessTokenValidUntil)) {
      return next(createHttpError(401, 'Access token expired'));
    }

    const user = await UsersCollection.findById(session.userId);
    if (!user) {
      return next(createHttpError(401, 'User not found'));
    }

    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(500, 'Internal Server Error'));
  }
};
