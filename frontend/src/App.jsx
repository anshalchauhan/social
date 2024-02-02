// Pages
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";

// Navigation
import { Routes, Route } from "react-router-dom";

// UI
import { Container } from "@chakra-ui/react";
import Header from "./components/Header";

function App() {
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
    </Container>
  );
}

export default App;
