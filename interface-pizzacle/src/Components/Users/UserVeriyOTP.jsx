import { useState } from "react";
import axios from "axios";

const UserVeriyOTP = () => {
  const [otp, setOtp] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  const handleVerify = () => {
    axios.post("http://localhost:3000/user/verifyOTP", { otp })
      .then(response => {
        if (response.data.status) {
          setVerificationStatus("OTP verified successfully");
        } else {
          setVerificationStatus("Invalid OTP");
        }
      })
      .catch(error => {
        console.error("Error verifying OTP:", error);
        setVerificationStatus("Failed to verify OTP. Please try again.");
      });
  };

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
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
            />
          </div>
          <button className="action" onClick={handleVerify}>
            Verify
          </button>
          {verificationStatus && <p>{verificationStatus}</p>}
        </form>
      </section>
    </>
  );
};

export default UserVeriyOTP;
