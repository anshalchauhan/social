// React
import { useEffect } from "react";

// UI
import {
  Flex,
  Avatar,
  Box,
  Text,
  Image,
  Portal,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

// Components
import Actions from "./Actions";

// Navigation
import { useNavigate } from "react-router-dom";

// Hooks
import useShowToast from "../hooks/useShowToast";

// Validation
import PropTypes from "prop-types";

// React Redux
import { useSelector } from "react-redux";

// Redux Toolkit query
import { useDeletePostMutation } from "../store/store";

function UserPost({
  id,
  name,
  username,
  profilePic,
  postedBy,
  createdAt,
  media,
  type,
  text,
  didLike,
  likes,
  replies,
}) {
  const showToast = useShowToast();
  const user = useSelector((state) => state.app.user);
  const navigate = useNavigate();

  // Date
  // Calculating how many days since post was uploaded
  let days = new Date(createdAt);
  days = Math.floor(Math.abs(Date.now() - days) / (24 * 60 * 60 * 1000));

  const [
    deletePost,
    { data: deletePostData, isLoading, isSuccess, isError, error },
  ] = useDeletePostMutation();

  const handleDeletePost = () => {
    deletePost(id);
  };

  useEffect(() => {
    if (isSuccess) showToast("Success", deletePostData.message, "success");
    else if (isError) showToast("Error", error.data.message, "error");
  }, [deletePostData, isError, isSuccess, error, showToast]);

  return (
    <>
      <Flex gap={3}>
        <Flex direction="column" align="center">
          <Avatar size="md" name={name} src={profilePic} />
          <Box w="1" h="full" bg="gray.light" my={2} />
          <Box position="relative" w="full">
            {replies[0] && (
              <Avatar
                size="xs"
                name={replies[0].username}
                src={replies[0].profilePic}
                position="absolute"
                bottom="0px"
                left="4px"
                padding="2px"
              />
            )}
            {replies[1] && (
              <Avatar
                size="xs"
                name={replies[1].username}
                src={replies[1].profilePic}
                position="absolute"
                bottom="0px"
                right="-5px"
                padding="2px"
              />
            )}
            {replies[2] && (
              <Avatar
                size="xs"
                name={replies[2].username}
                src={replies[2].profilePic}
                position="absolute"
                top="0px"
                left="15px"
                padding="2px"
              />
            )}
          </Box>
        </Flex>
        <Flex flex={1} direction="column" gap={2}>
          <Flex justify="space-between" w="full">
            <Flex align="center">
              <Button
                fontSize="sm"
                fontWeight="bold"
                variant="link"
                onClick={() => navigate(`/${username}`)}
              >
                {username}
              </Button>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} align="center">
              <Text fontStyle="sm" color="gray.light">
                {days ? `${days}d` : "today"}
              </Text>
              {user === postedBy && (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<BsThreeDots />}
                    isRound={true}
                    variant="ghost"
                  />
                  <Portal>
                    <MenuList bg="gray.dark">
                      <MenuItem bg="gray.dark" onClick={handleDeletePost}>
                        {isLoading ? <Spinner /> : "Delete Post"}
                      </MenuItem>
                    </MenuList>
                  </Portal>
                </Menu>
              )}
            </Flex>
          </Flex>
          <Text fontSize="sm">{text}</Text>
          {media && (
            <Box borderRadius={6} border="1px solid" borderColor="gray.light">
              {type.startsWith("image/") ? (
                <Flex alignItems="center" justifyContent="center">
                  <Image
                    src={media}
                    width="auto"
                    maxHeight="600px"
                    overflow="hidden"
                    alt="Uploaded Image"
                  />
                </Flex>
              ) : (
                <Flex alignItems="center" justifyContent="center">
                  <video className="video" width="full" controls loop>
                    <source src={media} type={type}></source>
                  </video>
                </Flex>
              )}
            </Box>
          )}
          <Actions postId={id} didLike={didLike} replies={replies} />
          <Flex gap={2} align="center">
            <Text color="gray.light" fontSize="sm">
              {`${replies.length} replies`}
            </Text>
            <Box w={0.5} h={0.5} borderRadius="full" bg="gray.light" />
            <Text color="gray.light" fontSize="sm">
              {`${likes} likes`}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {/* </Link> */}
    </>
  );
}

UserPost.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  postedBy: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  media: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  didLike: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      profilePic: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      repliedAt: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

UserPost.defaultProps = {
  media: "",
  type: "",
};

export default UserPost;
