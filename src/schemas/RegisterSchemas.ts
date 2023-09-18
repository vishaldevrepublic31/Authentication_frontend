import * as Yup from "yup";

export const RegisterSchemas = Yup.object({
  first_name: Yup.string().required("This field is required"),
  answer: Yup.string().required("This field is required"),
  last_name: Yup.string().required("This field is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("This field is required"),
  phone: Yup.string().min(10).max(10).required("Phone number is required "),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Password is mandatory"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords does not match")
    .required("Password is mendatory"),
    gender:Yup.string().oneOf(['male','female'] , "Please select valid gender").required("gender is required"),
    age:Yup.string().required("age is required"),

});

