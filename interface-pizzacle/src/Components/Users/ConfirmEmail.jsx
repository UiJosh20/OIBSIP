import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmEmail = () => {
    const [verificationStatus, setVerificationStatus] = useState("");
    const { verificationToken } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setVerificationStatus("A verification mail has been sent to your email...");
        setTimeout(()=>{
        setVerificationStatus("Email verified successfully. Redirecting to login page...");
        }, 15000)
        setTimeout(() => {
            navigate("/user/login");
        }, 17000)
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
