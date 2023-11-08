import { BrowserRouter, Routes, Route } from "react-router-dom";
import TextGenerate from "~/components/TextGenerate";
import SignIn from "~/components/signin/SignIn";
import SignUp from "~/components/signup/SignUp";
import DashBoard from "~/pages/DashBoard";
import RecommendName from "~/pages/RecommendName/RecommendName";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecommendName />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
