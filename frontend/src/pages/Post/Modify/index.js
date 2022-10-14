import * as S from "@components";
import { postSlice } from "@stores";
import api from "@utils/api";
import modifyValidator from "./modifyValidator";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Modify() {
  const postData = useSelector((state) => state.post.postData);
  const userData = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const params = useParams();
  const dispactch = useDispatch();

  const { register, watch, handleSubmit } = useForm({ mode: "onBlur", resolver: yupResolver(modifyValidator) });
  const image = watch("image");
  const [imagePreview, setImagePreview] = useState();

  const inputChecker = Object.entries(postData).flat().includes("") || !(imagePreview || postData?.image);
  const defaultValue = postData?.title || "";

  const setPostData = (data) => dispactch(postSlice.actions.setPostData({ ...postData, ...data }));
  const onChangeTitle = (e) => setPostData({ title: e.target.value });
  const onChangeContents = (e) => setPostData({ contents: e.target.value });

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [image]);

  useEffect(() => {
    if (params.postId === postData.postId) if (userData.uuid === postData.author) return;
    alert("권한이 없습니다!");
    navigate("../../");
  }, []);

  const onSubmit = async (data) => {
    console.log(data.image[0]);
    const formData = new FormData();
    formData.append("postId", postData.postId);
    formData.append("title", postData.title);
    formData.append("contents", postData.contents);
    formData.append("image", data.image[0] || postData.image);
    formData.append("date", postData.date);

    await api.patch(`/post/`, formData, {
      headers: {
        Authorization: `${token.accessToken}`,
      },
    });
    alert("게시글 작성 완료.");
    navigate("/");
  };

  return (
    <S.Container>
      <S.Box width="370px" height="330px" margin="50px auto 6px auto">
        <S.Box width="340px" height="300px" margin="auto" img={imagePreview || postData?.image}></S.Box>
      </S.Box>
      <S.Box width="370px" height="370px" margin="6px">
        <S.CustomForm width="100%" height="100%" margin="10px auto" onSubmit={handleSubmit(onSubmit)}>
          <S.TextField
            defaultValue={defaultValue}
            width="330px"
            height="12px"
            placeholder="제목"
            color="#EDEDED"
            onChange={onChangeTitle}
          />
          <S.TextArea defaultValue={defaultValue} onChange={onChangeContents} />
          <S.Container width="100%" margin="0" direction="row">
            <S.UploadImage margin="20px auto 10px 16px" type="file" {...register("image")} />
            <S.Typography margin="10px auto 0 20px" color="#DF5659">{`글자 수 ${
              postData?.contents?.length || 0
            }/1024)`}</S.Typography>
            <S.Button margin="10px 14px 0 auto" activate={!inputChecker} disabled={inputChecker} type="submit">
              작성 완료
            </S.Button>
          </S.Container>
        </S.CustomForm>
      </S.Box>
    </S.Container>
  );
}

export default Modify;
