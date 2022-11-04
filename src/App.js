import "./App.css";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgetPassword from "./components/ForgetPassword";
import ChangePassword from "./components/ChangePassword";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:token" element={<ChangePassword />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/*" element={<Navigate to="/not-found" replace />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
