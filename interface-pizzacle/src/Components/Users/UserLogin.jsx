import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { userLoginSchema } from "../../Schema/UserLoginSchema";
import { useState } from "react";
import Alert from '@mui/material/Alert';

export const UserLogin = () => {
     const URL = "http://localhost:3000/user/login";
        const [showPassword, setShowPassword] = useState(false);
        const [loggingIn, setLoggingIn] = useState(false);
        const [loginSuccess, setLoginSuccess] = useState(false);
        const [loginError, setLoginError] = useState(null);
        const navigate = useNavigate()
    
        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };
    
        const { handleChange, handleSubmit, values, errors } = useFormik({
            initialValues: {
                email: "",
                password: "",
            },
            validationSchema: userLoginSchema,
            onSubmit: (values) => {
                setLoggingIn(true);
                axios.post(URL, values)
                    .then((result) => {
                        if (result.data.status === true && result.data.token) {
                            localStorage.setItem("token", result.data.token);
                            localStorage.setItem("firstName", result.data.user.firstName);
                            localStorage.setItem("lastName", result.data.user.lastName);
                            setLoginSuccess(true);
                            setTimeout(() => {
                                navigate("/user/dashboard");
                            }, 3000);
                        } else {
                            console.error("error")
                        }
                    }).catch((err) => {
                        console.error(err.response.data.message);
                        setLoginError(err.response.data.message);
                        setTimeout(() => {
                            setLoginError(null);
                        }, 2000);
                    })
                    .finally(() => {
                        setTimeout(() => {
                            setLoggingIn(false);
                        }, 3000);
                    });
            }
        });
    
  return (
    <>
      <section className="flex justify-center bg-black h-screen border-t-2 border-green-700">
                    <main className="lg:m-20 shadow-md  text-white lg:rounded-lg px-4 pt-2 w-96">
                        <Link to='/' className="material-symbols-outlined text-green-500 text-4xl cursor-pointer">
                            home
                        </Link>
    
                        <h1 className="text-center w-full font-bold text-xl text-white-300 lg:block hidden pb-3">Login</h1>
                        <h1 className="text-center w-full mt-20 mb-10 font-bold text-2xl text-black lg:hidden">Login</h1>
                        <div className="px-5">
                            {loginSuccess && (
                                <Alert  severity="success">
                                    Logged in successfully
                                </Alert>
                            )}
                             {loginError && (
                                <Alert sx={{ width: "100%" }} severity="error">
                                    {loginError}
                                </Alert>
                            )}
                        </div>
                        <div className="px-5">
                            {(errors.email || errors.password) && (
                                <Alert sx={{ width: "100%" }} severity="warning">
                                    {errors.email || errors.password}
                                </Alert>
                            )}
    
                        </div> 
                        <form onSubmit={handleSubmit} className="lg:p-2 p-5">
                            <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
                                <input type="email" placeholder='Email Address' onChange={handleChange} name="email" value={values.email} className="w-full bg-none outline-none text-black" autoFocus/>
                                <span className="material-symbols-outlined text-black">
                                    person
                                </span>
                            </div>
                            <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
                                <input type={showPassword ? "text" : "password"} placeholder='Password' onChange={handleChange} name="password" value={values.password} className="w-full outline-none   text-black" />
                                <span className="material-symbols-outlined text-black cursor-pointer" onClick={togglePasswordVisibility}>
                                    {showPassword ? "visibility" : "visibility_off"}
                                </span>
                            </div>
                            <button type="submit" className="p-3 text-white rounded w-full mb-3 font-bold bg-green-700">
                                {loggingIn ? "Logging in..." : "Login"}
                            </button>
                            <p className="text-center">Don't have an account? <Link to='/user/register' className="text-gray-500 font-bold">Sign up</Link></p>
                            <div className="w-full flex justify-center lg:py-2 py-5 text-green-600 font-bold">
                                <Link to='/user/forgot'>forget password?</Link>
                            </div>
                        </form>
    
    
                    </main>
        </section>
    </>
  )
}
