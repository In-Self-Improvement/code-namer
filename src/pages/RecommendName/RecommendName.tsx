import React, { useEffect, useState } from "react";
import "./RecommendName.css";
import Select from "react-select";
import { getName } from "~/api/openai";
import {
  generateFunctionNameContent,
  generateVariableNameContent,
} from "~/utils/nameSuggestion";
import { postUserData } from "~/api/api";
import { userSchema } from "~/utils/firebaseSchema";

const RecommendName = () => {
  const [selectedItem, setSelectedItem] = useState("함수");
  const [desc, setDesc] = useState("");

  const changeSelect = (e: any) => {
    setSelectedItem(e.value);
  };
  const setInputExample = (event: any) => {
    event.preventDefault();
    setDesc("짝수인지 아닌지 판별하는 기능");
  };
  const selectItem = [
    { value: "함수", label: "함수" },
    { value: "변수", label: "변수" },
  ];
  const getContent = () => {
    if (selectedItem === "함수") return generateFunctionNameContent(desc);
    else return generateVariableNameContent(desc);
  };

  const generateName = async (event: any) => {
    event.preventDefault();
    const content = getContent();
    const name = await getName(content);
  };

  const changeDesc = (e: any) => {
    setDesc(e.target.value);
  };

  const saveData = (event: any) => {
    event.preventDefault();
    // const user = userSchema("test");
    // postUserData(user);
    // console.log("user", user);
  };

  return (
    <div className="page-container">
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
          options={selectItem as any}
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
            // onClick={setInputExample}
            onClick={saveData}
          >
            예시
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecommendName;
