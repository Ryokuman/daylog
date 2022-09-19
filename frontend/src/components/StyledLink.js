import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
    text-decoration: none;
    & > p {
        color: #143667;
    }
`;

export default StyledLink;
