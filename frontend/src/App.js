import { Route, Routes } from "react-router-dom";
import { Login, SignUp } from "./pages/accounts";
import { Error } from "./pages/Error";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/accounts">
                <Route index element={<Error />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
            </Route>
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default App;
