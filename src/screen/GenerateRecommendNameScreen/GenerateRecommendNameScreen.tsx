import React, { useState } from 'react';
import './GenerateRecommendNameScreen.css';
import Select from 'react-select';
import { getName } from '~/api/openai';
import {
  generateFunctionNameContent,
  generateVariableNameContent,
} from '~/utils/nameSuggestion';

import SignInModal from '~/screen/Signin/SignInModal';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsSignIn,
  selectUserID,
  selectEmail,
  selectUserName,
} from '~/redux/slice/authSlice';
type ItemType = {
  value: string;
  label: string;
};

import { saveRecommendName } from '~/firebase/firebase';
import { toastErrorMessage, toastSuccessMessage } from '~/utils/toastMessage';
import { useNavigate } from 'react-router-dom';
import { nameSuggestionOption } from '~/utils/nameSuggestionOption';
import { parseAndRemoveNumberPrefixes } from '~/utils/stringParser';
import { SET_LOADING } from '~/redux/slice/loadingSlice';
const GenerateRecommendNameScreen = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [desc, setDesc] = useState('');
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const isSignin = useSelector(selectIsSignIn);
  const userId = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
  const changeSelect = (event: { value: string; label: string }) => {
    setSelectedItem(event.value);
  };

  const setInputExample = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDesc('짝수인지 아닌지 판별하는 기능');
    toastSuccessMessage('예시가 입력되었습니다.');
  };
  const selectItem: ItemType[] = [
    { value: 'function', label: '함수' },
    { value: 'variable', label: '변수' },
  ];
  const getContent = () => {
    if (selectedItem === 'function') return generateFunctionNameContent(desc);
    return generateVariableNameContent(desc);
  };

  const checkSignin = () => {
    if (!isSignin && !isSignInModalOpen) {
      setSignInModalOpen(true);
    }
  };
  // desc, selectedItem이 있는지 확인하는 함수
  const checkDescAndSelectedItem = () => {
    const hasDesc = desc.length > 0;
    const hasSelectedItem = selectedItem.length > 0;

    if (hasDesc && hasSelectedItem) {
      return true;
    } else if (!hasSelectedItem) {
      toastErrorMessage('선택된 항목이 없습니다.');
      return false;
    } else {
      toastErrorMessage('기능을 입력해주세요.');
      return false;
    }
  };
  const saveRecommendData = (recommendItem: string[]) => {
    const recommendData = {
      name: `${userName}`,
      desc: `${desc}`,
      type: `${selectedItem}`,
      createdAt: new Date(),
      recommendName: recommendItem,
      options: nameSuggestionOption,
    };
    saveRecommendName(userEmail, recommendData);
  };

  const generateName = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(SET_LOADING(true));
    checkSignin();
    const enableGenerateName = checkDescAndSelectedItem();
    if (enableGenerateName) {
      const content = getContent();
      const openAIRecommendName = await getName(content);
      const result = parseAndRemoveNumberPrefixes(openAIRecommendName);
      saveRecommendData(result);
    }
    dispatch(SET_LOADING(false));
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

export default GenerateRecommendNameScreen;
