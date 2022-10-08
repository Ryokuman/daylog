import * as S from "@components";
import { useState } from "react";

function setCookie(name, value, exp) {
  var date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
}

function getCookie(name) {
  var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
}

function Test() {
  const [value, setValue] = useState();

  return (
    <div>
      <h1>{getCookie("pop")}</h1>
      <S.TextField
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <input
        onClick={() => {
          setCookie("pop", value, 7);
        }}
        type="button"
        value="cooook"
      />
    </div>
  );
}

export default Test;
