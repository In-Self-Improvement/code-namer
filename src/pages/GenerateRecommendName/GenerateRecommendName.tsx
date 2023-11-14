import React, { useEffect, useState } from 'react';
import './GenerateRecommendName.css';
import Select from 'react-select';
import { getName } from '~/api/openai';
import {
  generateFunctionNameContent,
  generateVariableNameContent,
} from '~/utils/nameSuggestion';

import { postUserData } from '~/api/api';
import { userSchema } from '~/utils/firebaseSchema';
import { useCheckSignin, useAuth } from '~/hooks/useAuth';
import SignInModal from '~/components/Signin/SignInModal';
type ItemType = {
  value: string;
  label: string;
};

import { parseByNewLine } from '~/utils/stringParser';
import { saveRecommendName } from '~/firebase/firebase';
import { addDoc, updateDoc, arrayUnion } from 'firebase/firestore';
const GenerateRecommendName = () => {
  const [selectedItem, setSelectedItem] = useState('함수');
  const [desc, setDesc] = useState('');
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const { user } = useAuth();
  const isSignin = useCheckSignin();
  const changeSelect = (event: { value: string; label: string }) => {
    setSelectedItem(event.value);
  };
  const setInputExample = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDesc('짝수인지 아닌지 판별하는 기능');
  };
  const selectItem: ItemType[] = [
    { value: '함수', label: '함수' },
    { value: '변수', label: '변수' },
  ];
  const getContent = () => {
    if (selectedItem === '함수') return generateFunctionNameContent(desc);
    return generateVariableNameContent(desc);
  };

  const checkSignin = () => {
    if (!isSignin && !isSignInModalOpen) {
      setSignInModalOpen(true);
    }
  };
  const saveRecommendData2 = (recommendItem: string[]) => {
    console.log('user', user);
    const recommendData = {
      name: `${user.displayName}`,
      desc: `${desc}`,
      type: `${selectedItem}`,
      createdAt: new Date(),
      recommendName: recommendItem,
    };
    saveRecommendName(recommendData);
  };
  const generateName = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const content = getContent();
    checkSignin();

    const openAIRecommendName = await getName(content);
    const result = parseByNewLine(openAIRecommendName);
    console.log('result', result);
    saveRecommendData2(result);
  };

  const changeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const closeSignInModal = () => {
    setSignInModalOpen(false);
  };
  return (
    <div className="page-container">
      <SignInModal
        isOpen={isSignInModalOpen}
        onRequestClose={closeSignInModal}
      />

      <div className="recommend_name_title">
        <header>기능을 알려주시면</header>
        <header>적절한 이름을 추천해 드려요</header>
      </div>
      <div className="recommend_name_subtitle">
        <h4>이름 생각하는데 구현하는 시간보다 더 걸린 적 없으신가요?</h4>
        <h4>적절한 이름이 생각이 안났다면 지금 바로 써보세요!</h4>
      </div>
      <form className="recommend_name_select_box">
        <Select
          className="recommend_name_select"
          placeholder="선택해 주세요"
          onChange={changeSelect}
          options={selectItem}
        />

        <button className="recommend_name_select_button" onClick={generateName}>
          생성하기
        </button>
      </form>

      <form className="recommend_name_input_form">
        <div className="recommend_name_input_form_title">
          <h4>기능을 입력한 후, </h4>
          <h4>'생성하기' 버튼을 눌러보세요!</h4>
        </div>
        <div className="input-container">
          <input
            className="recommend_name_input"
            type="text"
            value={desc}
            placeholder="기능을 입력해주세요."
            onChange={changeDesc}
          />

          <button
            className="recommend_name_example_button"
            onClick={setInputExample}
          >
            예시
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenerateRecommendName;
