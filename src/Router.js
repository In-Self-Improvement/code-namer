import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from '~/components/signup/SignUp';
import GenerateRecommendNameScreen from '~/screen/GenerateRecommendNameScreen/GenerateRecommendNameScreen';
import RecommendNameScreen from '~/screen/RecommendNameScreen/RecommendNameScreen';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GenerateRecommendNameScreen />} />
        <Route path="/result" element={<RecommendNameScreen />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
