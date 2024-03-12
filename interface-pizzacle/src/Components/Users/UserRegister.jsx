import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { RegisterSchema } from "../../Schema/UserAdminRegisterSchema"
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';



const UserRegister = () => {

  const URL = "http://localhost:4000/user/register";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword:"",
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityX = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      setSigningUp(true);
      if (values.password === values.confirmPassword){
        axios.post(URL, values)
          .then((response) => {
            if (response.data.status == 200) {
              setTimeout(() => {
                // navigate("/user/login");
              }, 3000);
            } else {
              // navigate("/user/signup");
            }
          })
          .catch((error) => {
            console.error("Registration failed:", error);
          })
          .finally(() => {
            setTimeout(() => {
              setSigningUp(false);
            }, 3000);
          });
      }else{
        alert("Password and Confirm Password does not match");
      }
    },
  });
  return (
    <>
      <section className="flex justify-center bg-black h-screen lg:p-10 w-full border-t-2 border-green-300">
        <main className=" shadow-md bg-black text-white lg:rounded-lg w-96 lg:py-3">
          <h1 className="lg:py-5 font-bold lg:text-3xl text-center lg:block hidden w-full text-white">Create Account</h1>
          <p className="pt-5 font-bold text-2xl text-center lg:hidden mt-10 mb-7 text-white">Create Account</p>
          <div className="px-5">
             {(errors.firstName || errors.lastName || errors.email || errors.password) && (
              <Alert sx={{ width: "100%" }} severity="warning">
                {errors.firstName || errors.lastName || errors.email || errors.password}
              </Alert>
            )} 
          </div>
          <form onSubmit={handleSubmit} className="lg:p-5 px-2">
            <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
              <input
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                name="firstName"
                value={values.firstName}
                className="w-full outline-none text-black"
                autoFocus
              />
              <span class="material-symbols-outlined text-black">
                info
              </span>
            </div>

            <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
              <input
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                name="lastName"
                value={values.lastName}
                className="w-full outline-none text-black"
              />
              <span class="material-symbols-outlined text-black">
                info
              </span>
            </div>

            <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
              <input
                type="email"
                placeholder="Email address"
                onChange={handleChange}
                name="email"
                value={values.email}
                className="w-full  text-black outline-none"
              />
              <span class="material-symbols-outlined text-black">
                mail
              </span>
            </div>
            <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handleChange}
                name="password"
                value={values.password}
                className="w-full outline-none text-black"
              />
              <span className="material-symbols-outlined text-black cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? "visibility" : "visibility_off"}
              </span>
            </div>
            <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                onChange={handleChange}
                name="confirmPassword"
                value={values.confirmPassword}
                className="w-full outline-none text-black"
              />
              <span className="material-symbols-outlined text-black cursor-pointer" onClick={togglePasswordVisibilityX}>
                {showConfirmPassword ? "visibility" : "visibility_off"}
              </span>
            </div>
            <button
              type="submit"
              className="w-full p-3 font-bold bg-green-600 text-white rounded-md"
              disabled={signingUp}
            >
              {signingUp ? "Signing up..." : "Signup"}
            </button>
            <p className="text-center">
              you already have an account?{" "}
              <Link to="/user/login" className="text-green-800">
                Login
              </Link>
            </p>
          </form>
        </main>

      </section>
    </>
  )
}

export default UserRegister