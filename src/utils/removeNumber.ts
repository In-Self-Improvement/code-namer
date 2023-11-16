export const removeNumberPrefixes = (input: string) => {
  const regex = /^\d+\.\s/gm;
  return input.replace(regex, '');
};
