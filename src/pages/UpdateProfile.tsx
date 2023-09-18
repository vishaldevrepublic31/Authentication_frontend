import { useDispatch, useSelector } from "react-redux";
import { UpdateProfileApi } from "../services/auth-service";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../redux/slices/authSlice";

function UpdateProfile() {
  const { user } = useSelector((state) => state?.auth);
  const [first_name, setFirst_name] = useState(user?.first_name || "");
  const [last_name, setLast_name] = useState(user?.last_name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [answer, setAnswer] = useState(user?.answer || "");
  const navigate = useNavigate();
  const dispatch = useDispatch()


  function handleSubmit(e: any) {

    e.preventDefault();
    const formdata = {
      first_name,
      last_name,
      phone,
      age,
      gender,
      answer,
    };
    const token = localStorage.getItem('token')
    UpdateProfileApi(token,formdata)
      .then((res) => {
        toast.success(res.data?.message);
        dispatch(login(res.data.user));
        navigate("/");
      })
      .catch((e) => {
        console.log('error',e);
        
        toast.error(e?.response?.data.message);
      });
  }

  return (
    <div className="flex  flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 h-[91.7vh]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Update your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white  px-6 py-12 shadow sm:rounded-lg sm:px-12 ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex gap-x-2">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
                <div>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex gap-x-2">
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Age
                </label>
                <div>
                  <input
                    id="age"
                    name="age"
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gender
                </label>
                <div>
                  <input
                    id="gender"
                    name="gender"
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                What is your best friend name ?
              </label>
              <div>
                <input
                  id="answer"
                  name="answer"
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
