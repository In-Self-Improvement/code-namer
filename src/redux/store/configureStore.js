import { applyMiddleware, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducer from "../reducers/index";
import reviewReducer from "../reducers/reviewReducer";

const configureStore = () => {
  const logger = createLogger();
  const middlewares = [thunk, logger];
  //배포용과 개발용의 미들웨어 차이를 두기 위함
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(thunk));
  const store = createStore(
    combineReducers({
      reducer,
      reviewReducer,
    }),
    enhancer
  );
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
