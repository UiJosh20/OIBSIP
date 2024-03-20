import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { verifySchema } from "../../Schema/VerifyOTPSchema";

const UserVeriyOTP = () => {
  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState("Verify OTP");

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
            setTimeout(() => {
              navigate("/user/createpassword");
            }, 3000);
          }
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
        <form className="form lg:w-full">
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
