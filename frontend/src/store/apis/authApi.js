// Redux Toolkit Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/auth",
  }),
  endpoints(builder) {
    return {
      login: builder.mutation({
        query: ({ username, password }) => {
          return {
            url: "/login",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
            }),
          };
        },
      }),

      logout: builder.mutation({
        query: () => {
          return {
            url: "/logout",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),

      signup: builder.mutation({
        query: ({ name, username, email, password }) => {
          return {
            url: "/signup",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              username,
              email,
              password,
            }),
          };
        },
      }),

      verifyOtp: builder.mutation({
        query: ({ email, otp }) => {
          return {
            url: "/verify-otp",
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              otp,
            }),
          };
        },
      }),

      forgotPassword: builder.mutation({
        query: ({ email }) => {
          return {
            url: "/forgot-password",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
            }),
          };
        },
      }),

      resetPassword: builder.mutation({
        query: ({ password, token }) => {
          return {
            url: `/reset-password/${token}`,
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password,
            }),
          };
        },
      }),
    };
  },
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
export { authApi };
