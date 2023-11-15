import React, { useEffect, useState } from 'react';
import OpenAI from 'openai';
import { useDispatch } from 'react-redux';

import { SET_LOADING } from '~/redux/slice/loadingSlice';
import { updateData, postData, getData, getDataByIndex } from '~/api/api';

const TextGenerate = () => {
  const [dataType, setDataType] = useState('함수');
  const [variableFunction, setVariableFunction] = useState('함수');
  const [recommendationNumber, setRecommendationNumber] = useState(5);
  const [functionality, setFunctionality] = useState('');
  const [text, setText] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);
  const dispatch = useDispatch();

  const openai = new OpenAI({
    // apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
  };

  const handleVariableFunctionChange = (e) => {
    if (e.target.value === '함수') setDataType('함수');
    setVariableFunction(e.target.value);
  };

  const handleRecommendationNumberChange = (e) => {
    setRecommendationNumber(Number(e.target.value));
  };

  const handleFunctionality = (e) => {
    setFunctionality(e.target.value);
  };

  const assembleContent =
    () => `당신은 함수 또는 변수 이름을 정말 잘 잣는 사람입니다.
      저는 ${variableFunction} 이름을 짓고 싶어요.
      데이터 타입은 ${dataType} 입니다
      기능은 ${functionality} 입니다
      ${recommendationNumber} 개의 이름을 추천해주세요.
      데이터 파싱하기 쉽게 '!'를 꼭 넣어주세요.
      ex) 1. 추천이름1! 2. 추천이름2! 3. 추천이름3!
      그 외의 답변은 써주지 마세요.
      ex) isEven: 기능 이름g
      `;

  const generateText = async () => {
    const content = assembleContent();

    dispatch(SET_LOADING(true));
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content }],
    });

    const answer = {};
    // await uploadData(answer);
    setText(completion.choices[0].message.content);
    dispatch(SET_LOADING(false));
  };
  const uploadData = async (recommendedNames) => {
    const fields = {};

    const data = {
      fields: {
        recommendedNames: {
          mapValue: {
            fields,
          },
        },
        selectedName: { stringValue: 'selected name' },
        likes: { integerValue: 0 },
        username: { stringValue: '테스터' },
        createdAt: { timestampValue: new Date().toISOString() },
        desc: { stringValue: functionality },
      },
    };
    postData('/test', data);
  };

  const checkVaildGenerateBtn = () => {
    if (dataType && variableFunction && recommendationNumber && functionality) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  useEffect(() => {
    checkVaildGenerateBtn();
  }, [dataType, functionality, recommendationNumber, variableFunction]);

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <form className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-700 mb-2 block">
              함수 | 변수
            </span>
            <select
              name="변수_함수"
              onChange={handleVariableFunctionChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-indigo-500"
            >
              <option value="">선택해주세요</option>
              <option value="함수">함수</option>
              <option value="변수">변수</option>
            </select>
          </label>
          {variableFunction !== '함수' && (
            <label className="block">
              <span className="text-sm text-gray-700 mb-2 block">
                데이터 타입
              </span>
              <select
                name="데이터_타입"
                onChange={handleDataTypeChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:border-indigo-500"
              >
                <option value="">선택해주세요</option>
                <option value="string">string</option>
                <option value="number">number</option>
                <option value="boolean">boolean</option>
              </select>
            </label>
          )}
          <label className="block">
            <span className="text-sm text-gray-700 mb-2 block">추천 갯수</span>
            <input
              type="text"
              name="추천_개수"
              defaultValue="5"
              onChange={handleRecommendationNumberChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-700 mb-2 block">기능</span>
            <input
              type="text"
              name="기능"
              placeholder="기능을 입력해주세요."
              onChange={handleFunctionality}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </label>
        </form>
        <button
          onClick={generateText}
          className={` bg-blue-500 text-white mt-4 rounded p-2 w-full hover:bg-blue-600 focus:outline-none ${
            disabledBtn ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={disabledBtn}
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
};

export default TextGenerate;
