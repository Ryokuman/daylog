import { Typography, StyledLink } from "../components";

function Error() {
    return (
        <div
            style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h1>죄송합니다. 페이지를 사용할 수 없습니다.</h1>
            <div style={{ display: "flex" }}>
                <Typography>
                    클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다.&nbsp;
                </Typography>
                <StyledLink>
                    <Typography>DayLog로 돌아가기.</Typography>
                </StyledLink>
            </div>
        </div>
    );
}

export { Error };
