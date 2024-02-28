// React
import { Suspense, lazy } from "react";

// Navigation
import { Routes, Route, Navigate } from "react-router-dom";

// UI
import { Container } from "@chakra-ui/react";

// Pages
const UserPage = lazy(() => import("./pages/UserPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const EmailSentPage = lazy(() => import("./pages/EmailSentPage"));
const UpdateProfilePage = lazy(() => import("./pages/UpdateProfilePage"));

// Components
const Header = lazy(() => import("./components/Header"));
const LogoutButton = lazy(() => import("./components/auth/LogoutButton"));
const CreatePost = lazy(() => import("./components/CreatePost"));

// Redux
import { useSelector } from "react-redux";
import TextPage from "./pages/TextPage";

function App() {
  const user = useSelector((state) => state.app.user);

  return (
    <Container maxW="620px">
      <Suspense fallback={<div>Loading...</div>}>
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
          <Route
            path="/:username/update"
            element={user ? <UpdateProfilePage /> : <Navigate to="/" />}
          />
          <Route
            path="/:username"
            element={user ? <UserPage /> : <Navigate to="/auth" />}
          />
          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route path="/text" element={<TextPage />} />
        </Routes>
        {user && <LogoutButton />}
        {user && <CreatePost />}
      </Suspense>
    </Container>
  );
}

export default App;
