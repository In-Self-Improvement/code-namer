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

/**
 * Firestore 데이터 형식으로 객체를 변환하는 함수
 * @param {Object} obj - 변환할 객체
 * @returns {Object} Firestore 데이터 형식으로 변환된 객체
 */
export const convertToFirestoreFormat = (obj) => {
  const fields = {};
  for (const key in obj) {
    const value = obj[key];
    // 값을 기반으로 Firestore 형식 결정
    if (typeof value === "string") {
      fields[key] = { stringValue: value };
    } else if (typeof value === "number") {
      fields[key] = Number.isInteger(value)
        ? { integerValue: value.toString() }
        : { doubleValue: value };
    } else if (typeof value === "boolean") {
      fields[key] = { booleanValue: value };
    } else if (value instanceof Date) {
      fields[key] = { timestampValue: value.toISOString() };
    } else if (Array.isArray(value)) {
      fields[key] = {
        arrayValue: { values: value.map(convertToFirestoreFormat) },
      };
    } else if (typeof value === "object" && value !== null) {
      fields[key] = { mapValue: { fields: convertToFirestoreFormat(value) } };
    } else {
      console.warn(`Unsupported data type for key "${key}":`, value);
    }
  }
  return { fields };
};
