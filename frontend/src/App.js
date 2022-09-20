import { Route, Routes } from "react-router-dom";
import { Login, SignUp, PasswordReset } from "@pages/accounts";
import { Error } from "@pages/Error";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/accounts">
                <Route index element={<Error />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="password/reset" element={<PasswordReset />} />
            </Route>
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default App;
