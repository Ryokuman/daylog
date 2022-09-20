import S from "@assets/pic/Logo.png";
import styled from "styled-components";

const Logo = styled.img.attrs({ src: S })`
    display: block;
    margin: ${(props) => (props.margin ? props.margin : 0)} auto;
    width: ${(props) => (props.width ? props.width : "175px")};
    height: ${(props) => (props.height ? props.height : "50px")};
`;

export default Logo;
