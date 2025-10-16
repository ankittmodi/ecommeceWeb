import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';

const generateRefreshToken = (userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: '7d' }
  );

  userModel.updateOne({ _id: userId }, { refresh_token: token }).catch(console.error);

  return token;
};

export default generateRefreshToken;
