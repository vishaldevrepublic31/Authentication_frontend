import Header from "../components/Header";
import PageNotFound from "../components/PageNotFound";
import { Routes, Route } from "react-router-dom";
import Signup from "../components/Signup";
import HomePage from "../pages/HomePage";
import SigninTest from "../components/SigninTest";
import { useEffect } from "react";
import { Profile } from "../services/auth-service";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import UpdateProfile from "../pages/UpdateProfile";
import ForgotePassword from "../pages/ForgotePassword";
import Private from "./private";
import Public from "./public";
import AllUser from "../components/post/AllUser";
import UserPost from "../components/UserPost";
import MyPost from "../components/post/MyPost";
import AddPost from "../components/post/AddPost";

const index: React.FC = () => {

  const dispatch = useDispatch();

  const token: string | null = localStorage.getItem("token");
  function getProfile(token: any) {
    Profile(token)
      .then((res) => {
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
          <Route path="/all-user" element={<AllUser />} />
          <Route path="/user-posts/:id" element={<UserPost />} />
          <Route path="/my-posts" element={<MyPost />} />
          <Route path="/add-post" element={<AddPost />} />
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
