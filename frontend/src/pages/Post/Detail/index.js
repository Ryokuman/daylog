import * as S from "@components";
import api from "@utils/api";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { viewPost } from "@stores/postSlice";

function Comments() {
  const params = useParams();

  const userData = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.token);
  const [commentData, setCommentData] = useState();
  const [text, setText] = useState();
  const [render, setRender] = useState(true);

  useEffect(() => {
    const getCommentData = async () => {
      const res = await api.get(`/comment/?postId=${params.postId}`);
      setCommentData(await res.data);
    };
    getCommentData();
  }, [render]);

  const onDeleteClick = async (e) => {
    const data = { commentId: e.target.id };
    await api.delete(`/comment/`, { headers: { Authorization: `${token.accessToken}` }, data });
    setRender(!render);
  };

  const inputChecker = !text || text.length > 300;
  const onTextAreaChange = (e) => setText(e.target.value);

  const onSubmit = async () => {
    const data = { postId: params.postId, contents: text };
    await api.post(`/comment/`, data, { headers: { Authorization: `${token.accessToken}` } });
    setRender(!render);
  };

  return (
    <S.Container margin="auto auto auto 10px">
      <S.Box width="370px" height="710px" margin="50px auto 6px auto">
        <S.Container display="inline" width="370px" height="500px" margin="10px" isScroll>
          {commentData?.map((e, i) => {
            const amIAuthor = e.author === userData.uuid;
            return (
              <S.Box width="340px" margin="4px 14px 16px 14px" color="#EDEDED" key={i}>
                <S.Container margin="10px auto 10px 10px" direction="row">
                  <S.Box width="25px" height="25px" margin="auto 10px auto 0" img={e.image} />
                  <S.Typography margin="auto auto auto 0">{e.user_id}</S.Typography>
                </S.Container>
                <S.Typography margin="10px auto 10px 10px">{e.contents}</S.Typography>
                {amIAuthor && (
                  <S.Button height="20px" margin="auto 4px 4px auto" activate id={e.comment_pk} onClick={onDeleteClick}>
                    X
                  </S.Button>
                )}
              </S.Box>
            );
          })}
        </S.Container>
        <S.Box width="350px" height="200px" margin="auto auto 10px auto">
          <S.TextArea margin="10px auto" onChange={onTextAreaChange} value={text} />
          <S.Container width="100%" margin="auto auto 10px auto" direction="row">
            <S.Typography margin="0 auto 0 20px" color="#DF5659">{`글자 수 ${text?.length || 0}/300`}</S.Typography>
            <S.Button
              margin="0 14px 0 auto"
              type="submit"
              activate={!inputChecker}
              disabled={inputChecker}
              onClick={onSubmit}
            >
              작성 완료
            </S.Button>
          </S.Container>
        </S.Box>
      </S.Box>
    </S.Container>
  );
}

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
    const data = { postId: postData.postId };
    await api.delete(`/post/`, { headers: { Authorization: `${token.accessToken}` }, data });
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
      <Comments />
    </S.Container>
  );
}

export default Detail;
