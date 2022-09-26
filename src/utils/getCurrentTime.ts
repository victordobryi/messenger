import { addZero } from './addZero';

export const getCurrentDate = () => {
  const today = new Date();
  const date = `Date: ${addZero(today.getDate())}-${addZero(
    today.getMonth() + 1
  )}; Time: ${addZero(today.getHours())}:${addZero(today.getMinutes())}`;
  return date;
};
