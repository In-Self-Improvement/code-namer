import { BrowserRouter, Routes, Route } from "react-router-dom";
import TextGenerate from "~/components/TextGenerate";
import SignIn from "~/components/signin/SignIn";
import SignUp from "~/components/signup/SignUp";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TextGenerate />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
