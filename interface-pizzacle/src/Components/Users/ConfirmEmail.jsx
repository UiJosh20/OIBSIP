import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmEmail = () => {
    const [verificationStatus, setVerificationStatus] = useState("");
    const { verificationToken } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/user/verify/${verificationToken}`)
            .then((response) => {
                const { data } = response;
                if (data) {
                    setVerificationStatus("A verification mail has been sent to your email...");
                    setTimeout(()=>{
                    setVerificationStatus("Email verified successfully. Redirecting to login page...");
                    }, 15000)
                    setTimeout(() => {
                        navigate("/user/login");
                    }, 17000);
                } else {
                    setVerificationStatus("Invalid token. Please contact support.");
                }
            })
            .catch((error) => {
                console.error("Verification failed:", error);
                setVerificationStatus("Verification failed. Please try again later.");
            });
    }, [verificationToken, navigate]);

    return (
        <section className="bg-black border-t-2 border-green-300 h-screen flex justify-center items-center">
            <main className="border w-96 border-green-500 rounded-md text-white p-7">
                <p className="text-xl">{verificationStatus}</p>
            </main>
        </section>
    );
}

export default ConfirmEmail;
