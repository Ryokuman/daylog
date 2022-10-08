function setCookie(name, value, exp, path) {
  var date = new Date();
  date.setTime(date.getTime() + exp * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=${path || "/"}`;
}

function getCookie(name) {
  var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
}

export { setCookie, getCookie };
