import Header from "../components/Header";
import PageNotFound from "../components/PageNotFound";
import { Routes, Route } from "react-router-dom";
import Signup from "../components/Signup";
import HomePage from "../pages/HomePage";
import SigninTest from "../components/SigninTest";
import About from "../pages/About";
import { useEffect } from "react";
import { Profile } from "../services/auth-service";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import UpdateProfile from "../pages/UpdateProfile";
import ForgotePassword from "../pages/ForgotePassword";
import Private from "./private";
import Public from "./public";
const index = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  function getProfile(token: any) {
    Profile(token)
      .then((res) => {
        toast.success(res.data?.message);
        dispatch(login(res.data.user));
      })
      .catch((e) => {
        toast.error(e?.response?.data.message);
      });
  }
  useEffect(() => {
    if (token) {
      getProfile(token);
    }
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Private />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/about" element={<About />} />
        </Route>

        <Route path="/" element={<Public />}>
          <Route path="/signin" element={<SigninTest />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgotePassword />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default index;
