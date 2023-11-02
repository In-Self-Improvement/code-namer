import React from "react";
import "./Loading.css";
import Spinner from "~/assets/spinner.gif";
import { selectIsLoading } from "~/redux/slice/loadingSlice";
import { useSelector } from "react-redux";

export const Loading = () => {
  const isLoading = useSelector(selectIsLoading);
  return (
    <div>
      {isLoading && (
        <div className="background">
          <div className="LoadingText">잠시만 기다려 주세요.</div>
          <img src={Spinner} alt="로딩중" width="5%" />
        </div>
      )}
    </div>
  );
};

export default Loading;
