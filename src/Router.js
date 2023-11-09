import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "~/components/signup/SignUp";
import DashBoard from "~/pages/DashBoard";
import RecommendName from "~/pages/RecommendName/RecommendName";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecommendName />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
