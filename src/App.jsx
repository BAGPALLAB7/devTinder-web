
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./gui/components/navbar"
import Body from "./gui/components/Body"
import Login from "./gui/components/Login"
import Profile from "./gui/components/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./gui/components/Feed"
function App() {


  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<Feed/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
</Provider>
    </>
  )
}

export default App
