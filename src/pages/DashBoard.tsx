import React, { useEffect, useState } from "react";
import { getData } from "~/api/api";
import { SET_LOADING } from "~/redux/slice/loadingSlice";
import { useDispatch } from "react-redux";

const DashBoard = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const fetchData = async () => {
    dispatch(SET_LOADING(true));
    const res = await getData("/test");
    console.log("res", res);
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(SET_LOADING(false));
    }
  }, [data]);

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {data?.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg m-4"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            데이터 상세보기
          </h2>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-600">유저 이름</h3>
              <p className="text-gray-800 mt-1">
                {item.fields.username.stringValue}
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-600">
                선택된 이름
              </h3>
              <p className="text-gray-800 mt-1">
                {item.fields.selectedName.stringValue}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-600">
                추천된 이름들
              </h3>
              <ul className="list-none pl-0 text-gray-800 mt-2">
                {Object.values(
                  item.fields.recommendedNames.mapValue.fields
                ).map((value: { stringValue: string }, index) => (
                  <li
                    key={index}
                    className="bg-blue-100 text-blue-700 text-lg rounded-md p-2 my-2"
                  >
                    {value.stringValue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashBoard;
