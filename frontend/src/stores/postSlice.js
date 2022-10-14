import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@utils/api";

const viewPost = createAsyncThunk("post/getPostData", async (postId) => {
  const resp = await api.get(`/post/?case=postId&value=${postId}`);
  const { post_pk, date, title, image, contents, author } = await resp.data;
  const rawDate = new Date(date);
  const newDate = `${rawDate.getFullYear()}-${rawDate.getMonth() + 1}-${rawDate.getDate()}`;
  const result = { postId: post_pk, date: newDate, title: title, image: image, contents: contents, author: author };
  return result;
});

const postSlice = createSlice({
  name: "post",
  initialState: {
    status: null,
    postData: {
      postId: null,
      date: null,
      title: null,
      image: null,
      contents: null,
      author: null,
    },
  },
  reducers: {
    setPostData: (state, action) => {
      state.postData.postId = action.payload?.postId;
      state.postData.date = action.payload?.date;
      state.postData.title = action.payload?.title;
      state.postData.image = action.payload?.image;
      state.postData.contents = action.payload?.contents;
      state.postData.author = action.payload?.author;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(viewPost.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(viewPost.fulfilled, (state, action) => {
      state.postData = action.payload;
      state.status = "complete";
    });
    builder.addCase(viewPost.rejected, (state, action) => {
      state.status = "fail";
    });
  },
});

export default postSlice;
export { viewPost };
