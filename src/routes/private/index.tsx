import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Private() {
  const navigate = useNavigate();
  const [checkedLogin, setCheckedLogin] = useState<string | null>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setCheckedLogin(token);
    } else {
      navigate("/signin");
    }
  });
  return <div>{checkedLogin ? <>
  <Outlet /> 
  </>
  : null}</div>;
}

export default Private;
