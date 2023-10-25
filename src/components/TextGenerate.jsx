import React from "react";
import OpenAI from "openai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content }],
    });
    console.log(completion.choices[0].message.content);
    setText(completion.choices[0].message.content);
  };
  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <form className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-700 mb-2 block">
              데이터 타입
            </span>
            <input
              type="text"
              name="데이터_타입"
              onChange={handleDataTypeChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-700 mb-2 block">
              함수 | 변수
            </span>
            <input
              type="text"
              name="변수_함수"
              onChange={handleVariableFunctionChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-700 mb-2 block">추천 갯수</span>
            <input
              type="text"
              name="추천_개수"
              onChange={handleRecommendationNumberChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-700 mb-2 block">기능</span>
            <input
              type="text"
              name="기능"
              onChange={handleFunctionality}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </label>
        </form>
        <button
          onClick={generateText}
          className="bg-blue-500 text-white mt-4 rounded p-2 w-full hover:bg-blue-600 focus:outline-none"
        >
          문자 생성
        </button>
      </div>
      {text && (
        <div className="mt-4 p-4 w-96 bg-white rounded shadow-md">
          <p className="text-sm text-gray-700">{text}</p>
        </div>
      )}
    </div>
  );
}

export default TextGenerate;
