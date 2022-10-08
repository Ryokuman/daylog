import styled from "styled-components";

const TextField = styled.input.attrs((props) => ({
  placeholder: props.placeholder,
  type: props.type,
}))`
  background-color: ${(props) => props.color || "#fafafa"};
  border: ${(props) => props.border || "1px #eaeaea solid"};
  width: ${(props) => props.width || "248px"};
  height: ${(props) => props.height || "18px"};
  font-size: 12px;
  display: ${(props) => props.display};
  padding: 9px 0px 7px 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  margin: ${(props) => props.margin || "0px auto 6px auto"};
`;

export default TextField;
