import * as bcrypt from 'bcrypt';

export const password_validate = async (
  passwordPlain: string,
  passwordEncrypted: string,
): Promise<boolean> => {
  return await bcrypt.compare(passwordPlain, passwordEncrypted);
};

export const password_hash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 5);
};
