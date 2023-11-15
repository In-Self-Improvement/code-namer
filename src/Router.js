import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from '~/components/signup/SignUp';
import DashBoard from '~/pages/DashBoard';
import GenerateRecommendName from '~/pages/GenerateRecommendName/GenerateRecommendName';
import RecommendNameScreen from '~/pages/RecommendNameScreen/RecommendNameScreen';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GenerateRecommendName />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/result" element={<RecommendNameScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
