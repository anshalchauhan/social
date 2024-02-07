// Pages
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import EmailSentPage from "./pages/EmailSentPage";

// Navigation
import { Routes, Route, Navigate } from "react-router-dom";

// UI
import { Container } from "@chakra-ui/react";

// Components
import Header from "./components/Header";
import LogoutButton from "./components/auth/LogoutButton";

// Context
import { useAppContext } from "./context/Context";

function App() {
  const { user } = useAppContext();
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="/" /> : <AuthPage />}
        />
        <Route
          path="/auth/reset-password/:token"
          element={user ? <Navigate to="/" /> : <ResetPasswordPage />}
        />
        <Route
          path="/auth/email-sent"
          element={user ? <Navigate to="/" /> : <EmailSentPage />}
        />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
      {user && <LogoutButton />}
    </Container>
  );
}

export default App;
