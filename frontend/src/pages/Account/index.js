import { Route, Routes } from "react-router-dom";
import { Error } from "@pages";
import Login from "./Login";
import SignUp from "./SignUp";
import PasswordReset from "./PasswordReset";

function Account() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="password/reset" element={<PasswordReset />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default Account;
