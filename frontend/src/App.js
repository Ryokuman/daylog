import { Route, Routes } from "react-router-dom";
import { Error, Test, Account, Main, Post } from "@pages";
import { Header } from "@components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="account/*" element={<Account />} />
      <Route path="*" element={<Error />} />
      <Route element={<Header />}>
        <Route path="post/*" element={<Post />} />
        <Route path="test" element={<Test />} />
      </Route>
    </Routes>
  );
}

export default App;
