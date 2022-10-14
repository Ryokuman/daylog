import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Detail from "./Detail";
import Write from "./Write";
import Modify from "./Modify";

function Post() {
  return (
    <Routes>
      <Route path="*">
        <Route index element={<Profile />} />
        <Route path="detail">
          <Route path=":postId" element={<Detail />} />
        </Route>
        <Route path="write">
          <Route path=":date" element={<Write />} />
        </Route>
        <Route path="mod">
          <Route path=":postId" element={<Modify />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Post;
