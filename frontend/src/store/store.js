// Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appReducer } from "./slices/appSlice";
import { authApi } from "./apis/authApi";
import { userApi } from "./apis/userApi";
import { postApi } from "./apis/postApi";

const store = configureStore({
  reducer: {
    app: appReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(postApi.middleware);
  },
});

setupListeners(store.dispatch);

export { setUser } from "./slices/appSlice";

export {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "./apis/authApi";

export {
  useGetUserQuery,
  useGetS3Query,
  useFollowUnfollowUserMutation,
  useUpdateUserMutation,
} from "./apis/userApi";

export {
  useCreatePostMutation,
  useGetPostQuery,
  useDeletePostMutation,
  useLikeUnlikePostMutation,
  useReplyToPostMutation,
  useGetUserPostsQuery,
  useGetFeedPostsQuery,
} from "./apis/postApi";

export { store };
