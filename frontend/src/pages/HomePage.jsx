// UI
import { Flex, Box, Text, useColorMode } from "@chakra-ui/react";

// Components
import UserPost from "../components/UserPost";
import NoPosts from "../assets/icons/NoPosts";

// React-Redux
import { useSelector } from "react-redux";

// Redux Toolkit Query
import { useGetFeedPostsQuery } from "../store/store";

function HomePage() {
  const user = useSelector((state) => state.app.user);
  const { colorMode } = useColorMode();
  // Redux Toolkit Query
  const { data: posts, isLoading, isError } = useGetFeedPostsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error has occurred!</div>;

  return (
    <Flex flexDirection="column" gap={16}>
      {posts?.data.length !== 0 ? (
        posts?.data.map((postData) => (
          <UserPost
            key={postData.post._id}
            id={postData.post._id}
            name={postData.name}
            username={postData.username}
            profilePic={postData.profilePic}
            postedBy={postData.post.postedBy}
            createdAt={postData.post.createdAt}
            media={postData.post.media}
            type={postData.post.type}
            text={postData.post.text}
            didLike={postData.post.likes.includes(user)}
            likes={postData.post.likes.length}
            replies={postData.post.replies}
          />
        ))
      ) : (
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={4}
          gap={4}
        >
          <Box w="full" height="1px" mb={12} bgColor={"#fff"}></Box>
          <NoPosts colorMode={colorMode} width="150" height="150" />
          <Text fontSize="xl" fontWeight="bold">
            No Posts/Friends Yet
          </Text>
          <Box w="full" height="1px" mt={12} bgColor={"#fff"}></Box>
        </Flex>
      )}
    </Flex>
  );
}

export default HomePage;
