export const convertStringToObject = (answer) => {
  if (checkIfAnswerIsCorrect(answer)) {
    const answerObject = answer
      .split("!")
      .map((item) =>
        item
          .split(".")
          .map((item) => item.trim())
          .filter((item) => item !== "")
      )
      .reduce((obj, item) => {
        if (item[0] && item[1]) {
          // Check if key and value exist
          obj[item[0]] = item[1];
        }
        return obj;
      }, {});
    return answerObject;
  } else {
    return "옳지 않은 질문입니다.";
  }
};

const checkIfAnswerIsCorrect = (answer) => {
  const isAvailableLength = answer.length < 150;
  return isAvailableLength;
};
