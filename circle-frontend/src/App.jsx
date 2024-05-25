import { Box, Container } from "@chakra-ui/react"
import { useState } from "react"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import DMPage from "./pages/DMPage"

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box position={"relative"} width={"full"}>
      <Container maxW="620px">

        <Header />
        <Routes>
          <Route path='/:username' element={<UserPage />} />
          <Route path='/:username/post/:pid' element={<PostPage />} />

          {/* todo: check user logged in, if not redirect to login page */}
          <Route path='/dm' element={<DMPage />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App
