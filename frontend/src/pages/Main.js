import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Main() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const test = Object.values(token)[1] || Object.values(token)[0];

  useEffect(() => {
    if (test) navigate("post/");
    else navigate("account/login");
  });

  return <div></div>;
}
