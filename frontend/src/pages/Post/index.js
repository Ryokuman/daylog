import { Route, Routes } from "react-router-dom";
import Sample from "./Sample";

function Post() {
  return (
    <Routes>
      <Route path="*">
        <Route index element={<Sample />} />
        <Route path="detail">
          <Route path="*" />
        </Route>
      </Route>
    </Routes>
  );
}

export default Post;
