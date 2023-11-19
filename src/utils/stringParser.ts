export const parseAndRemoveNumberPrefixes = (input: string) => {
  const regex = /^\d+\.\s/gm;
  const noNumberPrefixes = input.replace(regex, '');
  return noNumberPrefixes.split('\n').filter((line) => line.trim() !== '');
};
