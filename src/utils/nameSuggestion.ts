export const functionUserContent = (desc: string): string => {
  return `저는 함수 이름을 짓고 싶어요.
    아래의 규칙을 지켜서 함수 이름을 지어주세요.
  !제일 중요한 1원칙 입니다. 이름마다 구분하는 방법은 무조건 지켜주셔야 합니다.!
  절대로 이름 앞에 숫자를 붙이지마세요.  
  이름 마다 \\n 로 구분해주세요.

    옳지 못한 예) 1. isEven\n2. isNumber\n ...
    옳은 예) isEven\nisNumber\n ... 
    그 외의 답변은 써주지 마세요.

  기능은 ${desc} 입니다.
  5개의 이름을 추천해주세요.
    `;
};

export const functionAssistantContent = () => {
  return `
  아래의 규칙을 지켜서 함수 이름을 지어주세요.

  1. 동사로 작성
  나쁜예: apple(), car()
  좋은예: run(), getElement();
  2. Private 메소드라면
  메소드 이름 앞에 언더스코어(_)를 붙여주세요.
  3. 카멜 표기법 준수해주세요.
  4. 첫 글자로 연속된 2개의 언더스코어(__), 달러($) 사용하지 마세요.
  5. Getter, Setter 메소드
  get+ 멤버변수 이름 , set + 멤버변수 이름 형식으로 작성
  단, Getter 메소드의 반환값이 Boolean 인 경우 get 대신 is 조합 사용
  6. 이름은 간결하고 명확하게 작성해주세요. 
  7. 의미가 있는 이름이여야 하고, 의도가 분명해야합니다.
  8. 한 개념에 한 단어를 사용해주세요.
  9. 이름은 영어로 작성해주세요.`;
};

export const additionalFunctionUserContent = (
  desc: string,
  recommendName: string[]
) => {
  return `저는 함수 이름을 짓고 싶어요.
  아래의 규칙을 지켜서 함수 이름을 지어주세요.

  !제일 중요한 1원칙 입니다. 이름마다 구분하는 방법은 무조건 지켜주셔야 합니다.!
  절대로 이름 앞에 숫자를 붙이지마세요.  
  이름 마다 \\n 로 구분해주세요.
  옳지 못한 예) 1. isEven\n2. isNumber\n ...
  옳은 예) isEven\nisNumber\n ... 
  그 외의 답변은 써주지 마세요.

  기능은 ${desc} 입니다.
  아래의 이름의 목록은 제외하고 추천해주세요.
  제외해야할 이름 목록은 ${recommendName.join(', ')} 입니다.
  5개의 이름을 추천해주세요.
      `;
};

export const additionalFunctionAssistantContent = (options: string[]) => {
  return `
  아래의 규칙을 지켜서 함수 이름을 지어주세요.

  ${options.join(', ')}
  `;
};

export const variableUserContent = (desc: string): string => {
  return `저는 변수 이름을 짓고 싶어요.
  아래의 규칙을 지켜서 변수 이름을 지어주세요.

  !제일 중요한 1원칙 입니다. 이름마다 구분하는 방법은 무조건 지켜주셔야 합니다.!
  절대로 이름 앞에 숫자를 붙이지마세요.  
  추천된 이름과 \\n만 주시면 됩니다.
  이름 마다 \\n 로 구분해주세요.
  옳지 못한 예) 1. count\n2. length\n ...
  옳은 예) count\nlength\n ... 

  기능은 ${desc} 입니다
  5개의 이름을 추천해주세요.
    `;
};

export const variableAssistantContent = () => {
  return `
  아래의 규칙을 지켜서 함수 이름을 지어주세요.

  1. 변수의 이름은 명사로 작성해주세요. 시작을 동사로 하면 안됩니다.
  2. 카멜 표기법 준수해주세요.
  3. 첫 글자로 연속된 2개의 언더스코어(__), 달러($) 사용하지 마세요.
  4. 이름은 간결하고 명확하게 작성해주세요.
  5. 의미가 있는 이름이여야 하고, 의도가 분명해야합니다.
  6. 헝가리안 표기법은 사용하지 말아주세요
  7. 복수명 표기 하지 말아주세요.
  8. 줄임말은 사용하지 말아주세요.
  9. 한 개념에 한 단어를 사용해주세요.
  10. 이름은 영어로 작성해주세요.`;
};

export const additionalVariableUserContent = (
  desc: string,
  recommendName: string[]
): string => {
  return `저는 변수 이름을 짓고 싶어요.
  아래의 규칙을 지켜서 변수 이름을 지어주세요.

  !제일 중요한 1원칙 입니다. 이름마다 구분하는 방법은 무조건 지켜주셔야 합니다.!
  절대로 이름 앞에 숫자를 붙이지마세요.  
  추천된 이름과 \\n만 주시면 됩니다.
  이름 마다 \\n 로 구분해주세요.
  옳지 못한 예) 1. count\n2. length\n ...
  옳은 예) count\nlength\n ... 

  기능은 ${desc} 입니다
  아래의 이름의 목록은 제외하고 추천해주세요.
  제외해야할 이름 목록은 ${recommendName.join(', ')} 입니다.
  5개의 이름을 추천해주세요.
  `;
};

export const additionalVariableAssistantContent = (options: string[]) => {
  return `
  아래의 규칙을 지켜서 함수 이름을 지어주세요.

  ${options.join(', ')}`;
};
