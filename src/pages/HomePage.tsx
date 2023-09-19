
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const { user } = useSelector((state: any) => state?.auth);

  return <>
    <div className="h-[91.7vh] w-[100vw] flex flex-col justify-center items-center  bg-gradient-to-r from-cyan-500 to-blue-500" >
      <h1 className=" text-white font-semibold text-5xl"> Welcome , {user?.first_name}  {user?.last_name}</h1>
      <div className="space-x-3">
        <Link to={"/update-profile"}>
          <button className="text-white mt-12 bg-slate-600 p-3 rounded hover:bg-slate-500  hover:p-2.5 transition-all">Upadte Profile</button>
        </Link>
      </div>
    </div>
  </>;
}

export default HomePage