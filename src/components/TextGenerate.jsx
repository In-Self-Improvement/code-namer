import React, { useEffect } from "react";
import OpenAI from "openai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SET_LOADING } from "~/redux/slice/loadingSlice";
import { convertStringToObject } from "~/utils/openAIDataParsing";

function TextGenerate() {
  const [data_type, setDataType] = useState("없음");
  const [variable_function, setVariableFunction] = useState("없음");
  const [recommendation_number, setRecommendationNumber] = useState(5);
  const [functionality, setFunctionality] = useState("null");
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, // This is also the default, can be omitted
    dangerouslyAllowBrowser: true,
  });

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
  };

  const handleVariableFunctionChange = (e) => {
    setVariableFunction(e.target.value);
  };

  const handleRecommendationNumberChange = (e) => {
    setRecommendationNumber(Number(e.target.value));
  };

  const handleFunctionality = (e) => {
    setFunctionality(e.target.value);
  };

  const assembleContent = () => {
    return `당신은 함수 또는 변수 이름을 정말 잘 잣는 사람입니다.
      데이터 타입은 ${data_type} 입니다
      기능은 ${functionality} 입니다
      ${recommendation_number} 개의 이름을 추천해주세요.
      데이터 파싱하기 쉽게 '!'를 꼭 넣어주세요.
      ex) 1. 추천이름1! 2. 추천이름2! 3. 추천이름3!
      그 외의 답변은 써주지 마세요.
      ex) isEven: 기능 이름
      `;
  };

  const generateText = async () => {
    const content = assembleContent();
    console.log("content", content);

    dispatch(SET_LOADING(true));
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content }],
    });
    console.log(completion.choices[0].message);

    const answer = convertStringToObject(completion.choices[0].message.content);
    console.log("answer", answer);

    // setText(answer);
    dispatch(SET_LOADING(false));
  };

  useEffect(() => {
    console.log("text", text);
    console.log("typetext", typeof text);
  }, [text]);
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
          <p className="text-sm text-gray-700">{text[0]}</p>
        </div>
      )}
    </div>
  );
}

export default TextGenerate;
