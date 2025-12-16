// Set the environment variable before importing the library
if (typeof window !== 'undefined') {
  // @ts-ignore
  process.env.LOCK_SECRET = 'apobangpo1300';
}

import { decrypt as libDecrypt, encrypt as libEncrypt } from 'tanmayo7lock';

export const decrypt = (encryptedData: string) => {
  try {
    return libDecrypt(encryptedData);
  } catch (error) {
    console.error('Decryption error:', error);
    return '';
  }
};

export const encrypt = (data: any) => {
  try {
    return libEncrypt(data);
  } catch (error) {
    console.error('Encryption error:', error);
    return '';
  }
};