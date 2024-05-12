// React
import { useState, lazy, Suspense } from "react";

// Components
const LoginCard = lazy(() => import("../components/auth/LoginCard"));
const SignupCard = lazy(() => import("../components/auth/SignupCard"));
const VerifyOtpCard = lazy(() => import("../components/auth/VerifyOtpCard"));
const ForgotPasswordCard = lazy(
  () => import("../components/auth/ForgotPasswordCard")
);

function AuthPage() {
  const [active, setActive] = useState("login");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {active === "login" && <LoginCard setActive={setActive} />}
      {active === "signup" && <SignupCard setActive={setActive} />}
      {active === "verifyotp" && <VerifyOtpCard setActive={setActive} />}
      {active === "forgotpassword" && (
        <ForgotPasswordCard setActive={setActive} />
      )}
    </Suspense>
  );
}

export default AuthPage;
