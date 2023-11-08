import React, { useState } from "react";
import "./RecommendName.css";
import Select from "react-select";
const RecommendName = () => {
  const [selectedItem, setSelectedItem] = useState("함수");
  const [desc, setDesc] = useState("");

  const changeSelect = (e: any) => {
    setSelectedItem(e.value);
  };
  const setInputExample = () => {
    setDesc("짝수인지 아닌지 판별하는 함수");
  };
  const selectItem = [
    { value: "함수", label: "함수" },
    { value: "변수", label: "변수" },
  ];
  return (
    <div className="page-container">
      <div className="recommend_name_title">
        <header>기능을 알려주시면</header>
        <header>적절한 이름을 추천해 드려요</header>
      </div>
      <div className="recommend_name_subtitle">
        <h4>이름 생각하는데 구현하는 시간보다 더 걸린 적 없으시낙요?</h4>
        <h4>적절한 이름이 생각이 안났다면 지금 바로 써보세요!</h4>
      </div>
      <form className="recommend_name_select_box">
        <Select
          className="recommend_name_select"
          defaultValue={selectedItem}
          onChange={changeSelect}
          options={selectItem as any}
        />

        <button className="recommend_name_select_button">생성하기</button>
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
            name=""
            value={desc}
            placeholder="기능을 입력해주세요."
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

export default RecommendName;
