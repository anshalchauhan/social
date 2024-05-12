// React
import { useState, useEffect } from "react";

// UI
import { Flex, Text, useColorMode } from "@chakra-ui/react";

// Navigation
import { useParams } from "react-router-dom";

// Components
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import NoPosts from "../assets/icons/NoPosts";

// Hooks
import useShowToast from "../hooks/useShowToast";

// React-Redux
import { useSelector } from "react-redux";

// Redux toolkit Query
import { useGetUserQuery, useGetUserPostsQuery } from "../store/store";

function UserPage() {
  const [user, setUser] = useState(null);
  const { colorMode } = useColorMode();
  // Current User (User who has logged in)
  const { user: currentUser } = useSelector((state) => state.app);
  // Hooks
  const showToast = useShowToast();
  const { username } = useParams();

  // redux Toolkit Query
  const { data, error } = useGetUserQuery(username);
  const {
    data: postsData,
    isLoading,
    error: postsError,
  } = useGetUserPostsQuery(username);

  useEffect(() => {
    // Get user query
    if (data) setUser(data.user);
    else if (error) showToast("Error", error.data.message, "error");
    else if (postsError) showToast("Error", postsError.data.message, "error");
  }, [showToast, error, data, postsData, postsError]);

  if (isLoading) return <div>Loading...</div>;
  if (postsError) return <div>An error has occurred!</div>;

  return (
    <>
      {user && (
        <Flex flexDirection="column" gap={16}>
          <UserHeader user={user} />
          {postsData?.data.length !== 0 ? (
            postsData?.data.map((post) => (
              <UserPost
                key={post._id}
                id={post._id}
                name={user.name}
                username={user.username}
                profilePic={user.profilePic}
                postedBy={post.postedBy}
                createdAt={post.createdAt}
                media={post.media}
                type={post.type}
                text={post.text}
                didLike={post.likes.includes(currentUser)}
                likes={post.likes.length}
                replies={post.replies}
              />
            ))
          ) : (
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={4}
            >
              <NoPosts colorMode={colorMode} width="150" height="150" />
              <Text fontSize="xl" fontWeight="bold">
                No Posts Yet
              </Text>
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
}

export default UserPage;
