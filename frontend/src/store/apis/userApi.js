// Redux Toolkit Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/users",
  }),
  tagTypes: ["User"],
  endpoints(builder) {
    return {
      getUser: builder.query({
        query: (username) => {
          return {
            url: `/profile/${username}`,
            method: "GET",
          };
        },
        providesTags: ["User"],
      }),

      getS3: builder.query({
        query: () => {
          return {
            url: "/s3",
            method: "GET",
          };
        },
      }),

      followUnfollowUser: builder.mutation({
        query: (id) => {
          return {
            url: `/follow-unfollow-user/${id}`,
            method: "POST",
          };
        },
        invalidatesTags: ["User"],
      }),

      updateUser: builder.mutation({
        query: ({ id, name, username, bio, profilePic, password }) => {
          return {
            url: `/update-user/${id}`,
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              username,
              bio,
              profilePic,
              password,
            }),
          };
        },
      }),

      getUsers: builder.query({
        query: (searchQuery) => {
          return {
            url: `/search/${searchQuery === "" ? "nosearch" : searchQuery}`,
            method: "GET",
          };
        },
      }),

      getFollowers: builder.query({
        query: () => {
          return {
            url: "/getFollowers",
            method: "GET",
          };
        },
      }),

      getFollowing: builder.query({
        query: () => {
          return {
            url: "/getFollowing",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useGetUserQuery,
  useGetS3Query,
  useFollowUnfollowUserMutation,
  useUpdateUserMutation,
  useLazyGetUsersQuery,
  useGetFollowersQuery,
  useGetFollowingQuery,
} = userApi;
export { userApi };
