import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { verifySchema } from "../../Schema/VerifyOTPSchema";
import { Alert } from "@mui/material";

const UserVeriyOTP = () => {
  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState("Verify OTP");
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [verifyError, setVerifyError] = useState(null);

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
          <div>
            {verifySuccess && (
              <Alert severity="success">Verified successfully</Alert>
            )}
            {verifyError && (
              <Alert sx={{ width: "100%" }} severity="error">
                {verifyError}
              </Alert>
            )}
          </div>
          <div className="px-5">
            {errors.otp && (
              <Alert sx={{ width: "100%" }} severity="warning">
                {errors.otp}
              </Alert>
            )}
          </div>
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
          <button
            className="action"
            onClick={handleVerify}
            disabled={buttonText === "Verifying..."}
          >
            {buttonText}
          </button>
        </form>
      </section>
    </>
  );
};

export default UserVeriyOTP;
