export const parseAndRemoveNumberPrefixes = (input: string) => {
  const regex = /^\d+\.\s*|-\s*/gm;
  const noNumberPrefixes = input.replace(regex, '');
  return noNumberPrefixes
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => line.trim());
};
