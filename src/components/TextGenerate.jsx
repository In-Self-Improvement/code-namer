import React from "react";
import OpenAI from "openai";
import { useState } from "react";

function TextGenerate() {
  const [data_type, setDataType] = useState("");
  const [variable_function, setVariableFunction] = useState("");
  const [recommendation_number, setRecommendationNumber] = useState(5);
  const [functionality, setFunctionality] = useState("");
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, // This is also the default, can be omitted
    dangerouslyAllowBrowser: true,
  });

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
    console.log("data_type", data_type);
  };

  const handleVariableFunctionChange = (e) => {
    setVariableFunction(e.target.value);
    console.log("variable_function", variable_function);
  };

  const handleRecommendationNumberChange = (e) => {
    setRecommendationNumber(Number(e.target.value));
    console.log("recommendation_number", recommendation_number);
  };

  const handleFunctionality = (e) => {
    setFunctionality(e.target.value);
    console.log("functionality", functionality);
  };

  const assembleContent = () => {
    setContent(
      `You are a programmer who is good at naming.
      데이터 타입은 ${data_type}입니다. 
      기능은 ${functionality} 입니다. 
      Please list only ${recommendation_number} names.`
    );
  };

  const generateText = async () => {
    assembleContent();

    const completion: any = await openai.chat.completions.create({
      messages: [{ role: "system", content }],
      model: "text-davinci-002",
    });

    console.log(completion.choices[0].text);
    setText(completion.choices[0].text);
  };
  return (
    <div className="App">
      <form>
        <label>
          데이터 타입
          <input
            type="text"
            name="데이터_타입"
            onChange={handleDataTypeChange}
          />
        </label>
        <label>
          함수 | 변수
          <input
            type="text"
            name="변수_함수"
            onChange={handleVariableFunctionChange}
          />
        </label>
        <label>
          추천 갯수
          <input
            type="text"
            name="추천_개수"
            onChange={handleRecommendationNumberChange}
          />
        </label>
        <label>
          기능
          <input type="text" name="기능" onChange={handleFunctionality} />
        </label>
      </form>
      <button onClick={generateText}>문자 생성</button>
      <br />
      {text && <p>{text}</p>}
    </div>
  );
}

export default TextGenerate;
