import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { forgotPasswordSchema } from "../../Schema/ForgotPasswordSchema";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserForgotPassword = () => {
  const navigate = useNavigate();
  const URL = "http://localhost:3000/user/forgot";
  const [buttonText, setButtonText] = useState("Send OTP");

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      setButtonText("Sending OTP...");
      axios
        .post(URL, values)
        .then((response) => {
          if (response.data.otp) {
            setTimeout(() => {
              navigate("/user/verifyOTP");
            }, 3000);
          } else {
            setButtonText("Send OTP");
            navigate("/user/forgot");
          }
        })
        .finally(() => {
          setTimeout(() => {
            setButtonText("Send OTP");
          }, 1000);
        });
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen flex-col bg-black">
          <p className="logo1 !text-5xl mb-10 text-white">PIZZACLE</p>
          <div class="three-body">
            <div class="three-body__dot"></div>
            <div class="three-body__dot"></div>
            <div class="three-body__dot"></div>
          </div>
        </div>
      ) : (
        <>
          <section className="flex justify-center items-center lg:p-48 bg-black p-5 h-screen">
            <form onSubmit={handleSubmit} className=" w-96">
              <div className="flex gap-10 items-center ">
                <Link
                  to="/user/login"
                  class="material-symbols-outlined text-green-500"
                >
                  arrow_back
                </Link>
                <h4 className="text-white w-full font-bold text-xl py-5">
                  Reset password
                </h4>
              </div>
              <input
                type="email"
                placeholder="Email address"
                onChange={handleChange}
                name="email"
                value={values.email}
                className="w-full mb-3 p-3 bg-slate-100 rounded-md"
              />{" "}
              <span className="text-red-500">{errors.email}</span>
              <button
                type="submit"
                className="bg-green-700 p-3 text-white rounded w-full mb-3 font-bold"
                disabled={buttonText === "Sending OTP..."}
              >
                {buttonText}
              </button>
            </form>
          </section>
        </>
      )}
    </>
  );
};

export default UserForgotPassword;
