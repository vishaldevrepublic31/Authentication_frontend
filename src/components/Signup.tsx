import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { RegisterSchemas } from "../schemas/RegisterSchemas";
import { RegisteredUser } from "../services/auth-service";
import toast from "react-hot-toast";
export default function Signup() {
 const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      cpassword: "",
      gender: "",
      age: "",
      phone:"",
      answer:""
    },
    validationSchema: RegisterSchemas,
    onSubmit: async (values) => {
      console.log(values);
      const { first_name, last_name, email, password, cpassword, gender, age, phone, answer } = values
      const data = {
        first_name,
        last_name,
        email,
        password,
        cpassword,
        gender,
        age,
        phone,
        answer
      }
      RegisteredUser(data)
      .then((res)=>{
        toast.success(res.data?.message);
        navigate('/signin')
      })
      .catch((e)=>{
        toast.error(e?.response?.data.message);
        
      })
    },
  });
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white  px-6 py-12 shadow sm:rounded-lg sm:px-12 ">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              
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
                      value={formik.values.first_name}
                      onChange={formik.handleChange}

                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.first_name && formik.touched.first_name ? <p className="text-red-500">{formik.errors.first_name}</p> : null}
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
                      value={formik.values.last_name}
                      onChange={formik.handleChange}

                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                      {formik.errors.last_name && formik.touched.last_name ? <p className="text-red-500">{formik.errors.last_name}</p> : null}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                    {formik.errors.email && formik.touched.email ? <p className="text-red-500">{formik.errors.email}</p> : null}
                </div>
              </div>
              <div className="flex gap-x-2">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                      {formik.errors.password && formik.touched.password ? <p className="text-red-500">{formik.errors.password}</p> : null}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cpassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div>
                    <input
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      value={formik.values.cpassword}
                      onChange={formik.handleChange}

                      className="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                      {formik.errors.cpassword && formik.touched.cpassword ? <p className="text-red-500">{formik.errors.cpassword}</p> : null}
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
                    value={formik.values.phone}
                      onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                    {formik.errors.phone && formik.touched.phone ? <p className="text-red-500">{formik.errors.phone}</p> : null}
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
                      value={formik.values.age}
                      onChange={formik.handleChange}

                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                      {formik.errors.age && formik.touched.age ? <p className="text-red-500">{formik.errors.age}</p> : null}
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
                      value={formik.values.gender}
                      onChange={formik.handleChange}

                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                      {formik.errors.gender && formik.touched.gender ? <p className="text-red-500">{formik.errors.gender}</p> : null}
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
                    value={formik.values.answer}
                      onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                    {formik.errors.answer && formik.touched.answer ? <p className="text-red-500">{formik.errors.answer}</p> : null}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>

              
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already Register ?{" "}
            <Link
              to="/signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
