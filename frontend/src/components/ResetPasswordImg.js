import S from "@assets/pic/resetPassword.png";
import styled from "styled-components";

const ResetPasswordImg = styled.img.attrs({ src: S })`
    display: block;
    margin: ${(props) => (props.margin ? props.margin : "0 auto")};
    height: ${(props) => (props.height ? props.height : "70px")};
`;

export default ResetPasswordImg;
