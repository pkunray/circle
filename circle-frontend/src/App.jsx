import { Container } from "@chakra-ui/react"
import { useState } from "react"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"

import CreatePost from "./components/CreatePost"

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route path='/' element={<UserPage />} />
        <Route path='/:username' element={<UserPage />} />
        <Route path='/:username/post/:pid' element={<PostPage />} />
      </Routes>
      <CreatePost />
    </Container>
  )
}

export default App
