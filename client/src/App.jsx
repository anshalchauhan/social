// React
import { Suspense, lazy, useState } from "react";

// Navigation
import { Routes, Route, Navigate } from "react-router-dom";

// UI
import { Flex, Box, Button, Text } from "@chakra-ui/react";

// Pages
const UserPage = lazy(() => import("./pages/UserPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const EmailSentPage = lazy(() => import("./pages/EmailSentPage"));
const UpdateProfilePage = lazy(() => import("./pages/UpdateProfilePage"));

// Redux
import { useSelector } from "react-redux";
import SideBar from "./components/SideBar";
import SuggestedUser from "./components/SuggestedUser";
import Followers from "./components/Followers";
import Following from "./components/Following";

function App() {
  const user = useSelector((state) => state.app.user);
  const [list, setList] = useState("suggestions");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Flex
        gap={5}
        alignItems="flex-start"
        justifyContent="center"
        maxW="1200px"
        mx="auto"
      >
        {user && (
          <Box flex={20} position="sticky" top={0}>
            <SideBar flex={15} />
          </Box>
        )}
        <Box
          flex={60}
          borderX={user && `1px solid`}
          borderColor="gray.light"
          paddingX={8}
          paddingY={12}
        >
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
          </Routes>
        </Box>
        {user && (
          <Flex
            flexDirection="column"
            flex={25}
            position="sticky"
            top={0}
            gap={4}
            paddingY={8}
            paddingX={4}
            height="100vh"
          >
            <Flex gap={1}>
              <Button
                fontSize="sm"
                variant="link"
                textDecoration={list === "suggestions" && "underline"}
                onClick={() => setList("suggestions")}
              >
                Suggestions
              </Button>

              <Text fontSize="sm"> / </Text>
              <Button
                fontSize="sm"
                variant="link"
                textDecoration={list === "followers" && "underline"}
                onClick={() => setList("followers")}
              >
                Followers
              </Button>
              <Text fontSize="sm">/</Text>
              <Button
                fontSize="sm"
                variant="link"
                textDecoration={list === "following" && "underline"}
                onClick={() => setList("following")}
              >
                Following
              </Button>
            </Flex>
            {list === "suggestions" && <SuggestedUser />}
            {list === "followers" && <Followers />}
            {list === "following" && <Following />}
          </Flex>
        )}
      </Flex>
    </Suspense>
  );
}

export default App;
