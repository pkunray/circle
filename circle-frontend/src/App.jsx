import { Box, Container } from "@chakra-ui/react";
import { useState } from "react";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import AuthPage from "./pages/AuthPage";
import DMPage from "./pages/DMPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import LogoutButton from "./components/LogoutButton";
import CreatePost from "./components/CreatePost";

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Box position={"relative"} width={"full"}>
      <Container maxW="620px">
        <Header />
        <Routes>
          ]
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route
            path="/update"
            element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
          />
          {/* todo: check user logged in, if not redirect to login page */}
          <Route path="/dm" element={<DMPage />} />
        </Routes>

        {user && <CreatePost />}
        {user && <LogoutButton />}
      </Container>
    </Box>
  );
}

export default App;
