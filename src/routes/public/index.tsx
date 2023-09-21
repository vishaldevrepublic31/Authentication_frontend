import { useEffect, useState } from "react";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";

const Public: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [checkedLogin, setCheckedLogin] = useState<string | null>("");

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      setCheckedLogin(token);
    }
  });
  return <div>{checkedLogin ? <>
    {navigate('/')}
  </>
    : <Outlet />}</div>;
}

export default Public;
