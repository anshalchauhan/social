// Redux Toolkit Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postApi = createApi({
  reducerPath: "post",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/posts",
  }),
  tagTypes: ["Post", "Like", "Reply", "Delete"],
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
        invalidatesTags: ["Post"],
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
        query: (postId) => {
          return {
            url: `/delete/${postId}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Delete"],
      }),

      likeUnlikePost: builder.mutation({
        query: (postId) => {
          return {
            url: `/like/${postId}`,
            method: "POST",
          };
        },
        invalidatesTags: ["Like"],
      }),

      replyToPost: builder.mutation({
        query: ({ postId, text }) => {
          return {
            url: `/reply/${postId}`,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text,
            }),
          };
        },
        invalidatesTags: ["Reply"],
      }),

      getUserPosts: builder.query({
        query: (username) => {
          return {
            url: `/userPosts/${username}`,
            method: "POST",
          };
        },
        providesTags: ["Post", "Like", "Reply", "Delete"],
      }),

      getFeedPosts: builder.query({
        query: () => {
          return {
            url: "/feed",
            method: "POST",
          };
        },
        providesTags: ["Post", "Like", "Reply", "Delete"],
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
