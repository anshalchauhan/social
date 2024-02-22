// Redux Toolkit Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postApi = createApi({
  reducerPath: "post",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/posts",
  }),
  tagTypes: ["Post"],
  endpoints(builder) {
    return {
      createPost: builder.mutation({
        query: ({ postedBy, text, media, type }) => {
          return {
            url: "/create-post",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              postedBy,
              text,
              media,
              type,
            }),
          };
        },
      }),

      getPost: builder.query({
        query: ({ id }) => {
          return {
            url: `/${id}`,
            method: "GET",
          };
        },
      }),

      deletePost: builder.mutation({
        query: ({ id }) => {
          return {
            url: `/${id}`,
            method: "DELETE",
          };
        },
      }),

      likeUnlikePost: builder.mutation({
        query: ({ id }) => {
          return {
            url: `/like/${id}`,
            method: "POST",
          };
        },
      }),

      replyToPost: builder.mutation({
        query: ({ id, text }) => {
          return {
            url: `/reply/${id}`,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text,
            }),
          };
        },
      }),

      getUserPosts: builder.query({
        query: ({ username }) => {
          return {
            url: "/userPosts",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
            }),
          };
        },
      }),

      getFeedPosts: builder.query({
        query: () => {
          return {
            url: "/feed",
            method: "POST",
          };
        },
      }),
    };
  },
});

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useDeletePostMutation,
  useLikeUnlikePostMutation,
  useReplyToPostMutation,
  useGetUserPostsQuery,
  useGetFeedPostsQuery,
} = postApi;
export { postApi };
