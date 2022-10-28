import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config({ path: '../../variables.env' });

export const isValidPassword = (value) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(value);
};

export const hashPassword = async (password) =>
  bcrypt.hash(password, Number(process.env.SALT));

export default { isValidPassword };
