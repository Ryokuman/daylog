import styled from "styled-components";

const TextFiled = styled.input.attrs((props) => ({
    placeholder: props.placeholder,
    type: props.type,
}))`
    background-color: #fafafa;
    border: 1px #eaeaea solid;
    width: 248px;
    height: 18px;
    font-size: 12px;
    padding: 9px 0px 7px 8px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif;
    margin: ${(props) => (props.margin ? props.margin : "0px auto 6px auto")};
`;

export default TextFiled;
