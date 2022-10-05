function spaceRemover(e) {
  const value = e.target.value.split(" ").join("");
  e.target.value = value;
}

export default spaceRemover;
