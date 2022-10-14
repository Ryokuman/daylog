import * as S from "@components";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "@utils/api";
import writeValidator from "./writeValidator";
import { useSelector } from "react-redux";

function Write() {
  const token = useSelector((state) => state.token);
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(writeValidator) });

  const [imagePreview, setImagePreview] = useState("");
  const watcher = watch(["title", "contents", "image"]);
  const image = watch("image");
  const inputChecker = watcher.includes("") || watcher.includes(undefined) || Object.values(errors)[0] || !imagePreview;

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [image]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("contents", data.contents);
    formData.append("image", data.image[0]);
    formData.append("date", params.date);

    await api.post(`/post/`, formData, {
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
        <S.Box width="340px" height="300px" margin="auto" img={imagePreview}>
          {(image && image?.length !== 0) || "이미지를 업로드해 주세요"}
        </S.Box>
      </S.Box>
      <S.Box width="370px" height="370px" margin="6px">
        <S.CustomForm width="100%" height="100%" margin="10px auto" onSubmit={handleSubmit(onSubmit)}>
          <S.TextField
            margi="5px auto"
            width="330px"
            height="12px"
            placeholder="제목"
            color="#EDEDED"
            {...register("title")}
          />
          <S.TextArea {...register("contents")} />
          <S.Container width="100%" margin="0" direction="row">
            <S.UploadImage margin="20px auto 10px 16px" type="file" {...register("image")} />
            <S.Typography margin="10px auto 0 20px" color="#DF5659">{`글자 수 (${
              watcher[1]?.length || 0
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

export default Write;
