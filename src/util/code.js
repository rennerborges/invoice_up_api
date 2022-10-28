const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVXWZabcdefghijklmnopqrstuvxwz';

// eslint-disable-next-line import/prefer-default-export
export function generateSerialNumbers(serialNumbers) {
  let serial = '';
  for (let count = 0; count < serialNumbers; count += 1) {
    const random = Math.floor(Math.random() * chars.length);
    serial += chars[random];
  }

  return serial;
}
