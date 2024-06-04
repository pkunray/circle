import { Container } from "@chakra-ui/react"
import { useState } from "react"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import { Route, Routes, Navigate } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import AuthPage from "./pages/AuthPage"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import CreatePost from "./components/CreatePost"

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route path='/' element={user ? <HomePage /> : <Navigate to="auth" />} />
        <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to="/" />} />
        <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />

        <Route
          path='/:username'
          element={
            user ? (
              <>
                <UserPage />
                <CreatePost />
              </>
            ) : (
              <UserPage />
            )
          }
        />

        <Route path='/:username/post/:pid' element={<PostPage />} />
      </Routes>

    </Container>
  )
}

export default App