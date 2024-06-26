import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import RequiredAnonymous from "components/routes/RequiredAnonymous";
import RequiredAuth from "components/routes/RequiredAuth";
import SignIn from "pages/sign-in";
import SignUp from "pages/sign-up";
import Cabinet from "pages/cabinet";
import Admin from "pages/admin";
import SignOut from "pages/sign-out";
import Public from "pages/public"
import User from "pages/user";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/public/releases" />} />
      <Route element={<RequiredAnonymous />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/public/*" element={<Public />} />
      </Route>
      <Route element={<RequiredAuth />}>
        <Route path="/cabinet" element={<Cabinet />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/user/*" element={<User />} />
        <Route path="/sign-out" element={<SignOut />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
)

export default App
