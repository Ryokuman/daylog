import * as S from "@components";
import api from "@utils/api";

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { viewPost } from "@stores/postSlice";

function Detail() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.userData);
  const postData = useSelector((state) => state.post.postData);
  const token = useSelector((state) => state.token);
  const amIAuthor = postData?.author && userData?.uuid && postData?.author === userData?.uuid;

  useEffect(() => {
    const setinitial = async () => await dispatch(viewPost(params.postId));
    setinitial();
  }, []);

  const onModClick = () => navigate(`../../mod/${params.postId}`);
  const onDeleteClick = async () => {
    const data = {
      postId: postData.postId,
    };
    await api.delete(`/post/`, {
      headers: {
        Authorization: `${token.accessToken}`,
      },
      data,
    });
    navigate(`../../`);
  };

  return (
    <S.Container direction="row">
      <S.Container margin="auto 10px auto auto">
        <S.Box width="370px" height="330px" margin="50px auto 6px auto">
          <S.Box width="340px" height="300px" margin="auto" img={postData?.image || ""}></S.Box>
        </S.Box>
        <S.Box width="370px" height="370px" margin="6px">
          <S.Box margin="4px auto" width="350px" height="20px">
            <S.Typography>{postData?.title || ""}</S.Typography>
          </S.Box>
          <S.Box margin="4px auto" width="350px" height="270px">
            <S.Typography>{postData?.contents || ""}</S.Typography>
          </S.Box>
          {amIAuthor && (
            <S.Container width="100%" margin="0" direction="row">
              <S.Button margin="10px auto 0 14px" activate onClick={onDeleteClick}>
                삭제하기
              </S.Button>
              <S.Button margin="10px 14px 0 auto" activate onClick={onModClick}>
                수정하기
              </S.Button>
            </S.Container>
          )}
        </S.Box>
      </S.Container>
      <S.Container margin="auto auto auto 10px">
        <S.Box width="370px" height="710px" margin="50px auto 6px auto">
          <S.Container display="inline" width="370px" height="500px" margin="10px" isScroll>
            <S.Box width="340px" height="200px" margin="4px 14px 16px 14px" color="#EDEDED"></S.Box>
          </S.Container>
          <S.Box width="350px" height="200px" margin="auto auto 10px auto" color="#EDEDED"></S.Box>
        </S.Box>
      </S.Container>
    </S.Container>
  );
}

export default Detail;
