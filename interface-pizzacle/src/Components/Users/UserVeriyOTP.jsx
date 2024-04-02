import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { verifySchema } from "../../Schema/VerifyOTPSchema";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserVeriyOTP = () => {
  const deployedLink = "https://oibsip-90i2.onrender.com";

  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Verify OTP");

  const URL = `${deployedLink}/user/verifyOtp`;

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: verifySchema,
    onSubmit: (values) => {
      setButtonText("Verifying...");
      axios
        .post(URL, values)
        .then((response) => {
          if (response.data.status == true) {
            setButtonText("Verified");
            setVerifySuccess(true);
            setTimeout(() => {
              navigate("/user/createNewPassword");
            }, 3000);
          }
        })
        .catch((err) => {
          console.error(err.response.data.message);
          setVerifyError(err.response.data.message);
          setTimeout(() => {
            setVerifyError(null);
          }, 2000);
        })
        .finally(() => {
          setTimeout(() => {
            setButtonText("Verify OTP");
          }, 3000);
        });
    },
  });

  return (
    <>
      <section className="flex justify-center items-center lg:p-48 bg-black p-5 h-screen">
        <form className="form lg:w-full" onSubmit={handleSubmit}>
          <div className="title">OTP Verification</div>
          <p className="message">
            We have sent a verification code to your email address
          </p>
          <div className="inputs">
            <input
              type="text"
              onChange={handleChange}
              name="otp"
              value={values.otp}
              maxLength="6"
            />
          </div>
          <button className="action" disabled={buttonText === "Verifying..."}>
            {buttonText}
          </button>
        </form>
      </section>
    </>
  );
};

export default UserVeriyOTP;
