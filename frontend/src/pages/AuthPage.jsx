// React
import { useState } from "react";

// Components
import LoginCard from "../components/auth/LoginCard";
import SignupCard from "../components/auth/SignupCard";
import VerifyOtpCard from "../components/auth/VerifyOtpCard";
import ForgotPasswordCard from "../components/auth/ForgotPasswordCard";

const AuthPage = () => {
  const [active, setActive] = useState("login");

  return (
    <>
      {active === "login" && (
        <LoginCard active={active} setActive={setActive} />
      )}
      {active === "signup" && (
        <SignupCard active={active} setActive={setActive} />
      )}
      {active === "verifyotp" && (
        <VerifyOtpCard active={active} setActive={setActive} />
      )}
      {active === "forgotpassword" && (
        <ForgotPasswordCard active={active} setActive={setActive} />
      )}
    </>
  );
};

export default AuthPage;
