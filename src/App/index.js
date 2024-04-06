import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import RequiredAnonymous from "components/routes/RequiredAnonymous";
import RequiredAuth from "components/routes/RequiredAuth";
import SignIn from "pages/sign-in";
import SignUp from "pages/sign-up";
import Cabinet from "pages/cabinet";
import Admin from "pages/admin";
import SignOut from "pages/sign-out";
import Games from "pages/games"
import User from "pages/user";
import UserSettings from "pages/user/settings";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/sign-in" />} />
      <Route element={<RequiredAnonymous />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/games" element={<Games />} />
      </Route>
      <Route element={<RequiredAuth />}>
        <Route path="/cabinet" element={<Cabinet />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/user/*" element={<User />} />
        <Route path="/user-settings" element={<UserSettings />} />
        <Route path="/sign-out" element={<SignOut />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
)

export default App
