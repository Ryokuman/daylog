import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: ${(props) =>
        props.direction ? props.direction : "column"};
    background-color: ${(props) => (props.color ? props.color : "white")};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    margin: auto;
    border: ${(props) => (props.border ? props.border : "1px #EDEDED solid")};
    text-align: center;
`;

export default Container;
