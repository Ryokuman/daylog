import logo from "@assets/pic/logo.png";
import explore from "@assets/pic/explore.png";
import friends from "@assets/pic/friends.png";
import fail from "@assets/pic/fail.png";
import notification from "@assets/pic/notification.png";
import resetPassword from "@assets/pic/resetPassword.png";
import search from "@assets/pic/search.png";
import success from "@assets/pic/success.png";

import styled from "styled-components";

function setSource(value) {
    if (value === "logo") return logo;
    else if (value === "explore") return explore;
    else if (value === "friends") return friends;
    else if (value === "fail") return fail;
    else if (value === "notification") return notification;
    else if (value === "resetPassword") return resetPassword;
    else if (value === "search") return search;
    else if (value === "success") return success;
}

const CustomIMG = styled.img.attrs((props) => ({
    src: setSource(props.img),
}))`
    display: block;
    margin: ${(props) => (props.margin ? props.margin : "0 auto")};
    width: ${(props) => (props.width ? props.width : "175px")};
    height: ${(props) => (props.height ? props.height : "50px")};
`;

export default CustomIMG;
