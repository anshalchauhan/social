// React
import { useEffect } from "react";

// UI
import {
  Flex,
  Box,
  Avatar,
  Text,
  Button,
  Link,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";

// Navigation
import { useParams, useNavigate } from "react-router-dom";

// Hooks
import useShowToast from "../hooks/useShowToast";

// Validation
import PropTypes from "prop-types";

// Redux Toolkit
import { useSelector } from "react-redux";

// Redux Toolkit Query
import { useFollowUnfollowUserMutation } from "../store/store";

function UserHeader({ user }) {
  const showToast = useShowToast();
  const { user: currentUser } = useSelector((state) => state.app);
  const { username } = useParams();
  const navigate = useNavigate();

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      showToast("Success", "Profile link copied.", "success");
    });
  };

  const [
    followUnfollowUser,
    { data: followUnfollowUserData, isSuccess, isLoading, isError, error },
  ] = useFollowUnfollowUserMutation();

  const handleFollowUnfollow = () => {
    followUnfollowUser(user._id);
  };

  useEffect(() => {
    if (isSuccess)
      showToast("Success", followUnfollowUserData.message, "success");
    else if (isError) showToast("Error", error.data.message, "error");
  }, [showToast, isSuccess, isError, error, followUnfollowUserData]);

  return (
    <Flex gap={4} direction="column" align="center">
      <Flex justify="space-between" w="full">
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            {user.name}
          </Text>
          <Flex gap={1} align="center">
            <Text fontSize="sm">{user.username}</Text>
            <Text
              fontSize="xs"
              bg={useColorModeValue("gray.800", "whiteAlpha.900")}
              color={useColorModeValue("whiteAlpha.900", "gray.800")}
              p={1}
              borderRadius={12.5}
            >
              social.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            name={user.name}
            src={user.profilePic || ""}
            size={{
              base: "md",
              md: "xl",
            }}
          />
        </Box>
      </Flex>
      <Text alignSelf="start">{user.bio}</Text>
      {currentUser === user._id ? (
        <Button
          alignSelf="start"
          size="sm"
          onClick={() => {
            navigate(`/${username}/update`);
          }}
        >
          Update Profile
        </Button>
      ) : (
        <Button alignSelf="start" size="sm" onClick={handleFollowUnfollow}>
          {isLoading ? (
            <Spinner />
          ) : user.followers.includes(currentUser) ? (
            "Unfollow"
          ) : (
            "Follow"
          )}
        </Button>
      )}
      <Flex justify="space-between" w="full">
        <Flex gap={2} align="center">
          <Text fontSize="sm" color="gray.light">
            {user.followers.length} followers
          </Text>
          <Box w="1" h="1" bg="gray.light" borderRadius="full" />
          <Link fontSize="sm" color="gray.light" to="#">
            instagram.com
          </Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor="pointer" />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor="pointer" />
              </MenuButton>
              <Portal>
                <MenuList bg="gray.dark">
                  <MenuItem bg="gray.dark" onClick={copyURL}>
                    Copy link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w="full">
        <Flex
          flex={1}
          borderBottom="1.5px solid white"
          justify="center"
          pb="3"
          cursor="pointer"
        >
          <Text fontWeight="bold">Posts</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom="1px solid gray"
          justify="center"
          color="gray.light"
          pb="3"
          cursor="pointer"
        >
          <Text fontWeight="bold">Replies</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

UserHeader.propTypes = {
  user: PropTypes.object,
};

export default UserHeader;
