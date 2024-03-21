import { useFormik } from 'formik';
import React, { useState } from 'react'
import { createNewPassword } from '../../Schema/CreateNewPasswordSchema';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

const UserCreateNewPassword = () => {
    const navigate = useNavigate();
    const URL = "http://localhost:3000/user/createNewPassword";
    const [buttonText, setButtonText] = useState("Create new password");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: createNewPassword,
        onSubmit: (values) => {
            setButtonText("changing old password...");
            axios.post(URL, values)
            .then((response)=>{
                if (response.data.status == true){
                    setButtonText("Changed");
                    setLoginSuccess(true);
                    setTimeout(() => {
                        navigate("/user/login");
                    }, 3000); 
                }
               
            })
            .catch((err)=>{
                console.log(err)
                setLoginError(true)
            })
            .finally(() => {
                
                setTimeout(() => {
                    setButtonText("Create new password");
                }, 3000);
            });
        }
    });
    
    return (
        <>
        <section className="flex justify-center items-center lg:p-48 bg-black p-5 h-screen">
        
                <main>
                <div className="px-5 mb-5">
                            {loginSuccess && (
                                <Alert  severity="success">
                                    Password changed successfully
                                </Alert>
                            )}
                             {loginError && (
                                <Alert sx={{ width: "100%" }} severity="error">
                                    {loginError}
                                </Alert>
                            )}
                        </div>
                        <div className="px-5 mb-5">
                            {(errors.email || errors.password) && (
                                <Alert  sx={{ width: "100%" }} severity="warning">
                                    {errors.email || errors.password}
                                </Alert>
                            )}
    
                        </div> 
            <form onSubmit={handleSubmit} className=" w-96">
                <input type="email" placeholder='Enter email address' onChange={handleChange} name="email" value={values.email} className="w-full mb-3 p-3 bg-slate-100 rounded-md" /> 
                <input type="text" placeholder='Enter a new password' onChange={handleChange} name="password" value={values.password} className="w-full mb-3 p-3 bg-slate-100 rounded-md" />
                <button type="submit" className="bg-green-700 p-3 text-white rounded w-full mb-3 font-bold" disabled={buttonText === "Changing old password..."}>{buttonText}</button>
            </form>
                </main>
        </section>
        </>
    );
}

export default UserCreateNewPassword