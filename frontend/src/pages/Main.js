import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getInitialState } from "@stores/userSlice";

export default function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const is_token_contain = Object.values(token)[0] || Object.values(token)[1];

  useEffect(() => {
    async function handler() {
      if (is_token_contain) {
        await dispatch(getInitialState(token));
        navigate("post/");
      } else navigate("account/login");
    }
    handler();
  }, []);

  return <div></div>;
}
