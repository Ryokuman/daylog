import { createGlobalStyle } from "styled-components";
import MaruBuri from "@assets/fonts/MaruBuri-Regular.otf";

const Fonts = createGlobalStyle`
    @font-face {
        font-family: "MaruBuri";
        src: url(${MaruBuri}) format('opentype');
    }
`;
export default Fonts;
