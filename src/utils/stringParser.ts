export const parseByNewLine = (content: string) => {
  return content.split('\n').filter((line) => line.trim() !== '');
};
