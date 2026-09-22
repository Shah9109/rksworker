import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, role: string): string => {
  const secret = process.env.JWT_SECRET || 'workpower_super_secret_jwt_key_2026';
  return jwt.sign({ id: userId, role }, secret, {
    expiresIn: '30d',
  });
};

export const verifyToken = (token: string): any => {
  const secret = process.env.JWT_SECRET || 'workpower_super_secret_jwt_key_2026';
  return jwt.verify(token, secret);
};
