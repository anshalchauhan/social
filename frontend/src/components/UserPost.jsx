// UI
import { Flex, Avatar, Box, Text, Image } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

// Navigation
import { Link } from "react-router-dom";

// Validation
import PropTypes from "prop-types";

// Components
import Actions from "./Actions";

function UserPost({ postImg, postTitle, likes, replies }) {
  return (
    <>
      <Link to="/markzuckerberg/post/1">
        <Flex gap={3} mb={4} py={5}>
          <Flex direction="column" align="center">
            <Avatar size="md" name="Mark Zuckerberg" src="/zuck-avatar.png" />
            <Box w="1" h="full" bg="gray.light" my={2} />
            <Box position="relative" w="full">
              <Avatar
                size="xs"
                name="John Doe"
                src="https://bit.ly/dan-abramov"
                position="absolute"
                top="0px"
                left="15px"
                padding="2px"
              />
              <Avatar
                size="xs"
                name="John Doe"
                src="https://bit.ly/sage-adebayo"
                position="absolute"
                bottom="0px"
                right="-5px"
                padding="2px"
              />
              <Avatar
                size="xs"
                name="John Doe"
                src="https://bit.ly/prosper-baba"
                position="absolute"
                bottom="0px"
                left="4px"
                padding="2px"
              />
            </Box>
          </Flex>
          <Flex flex={1} direction="column" gap={2}>
            <Flex justify="space-between" w="full">
              <Flex w="full" align="center">
                <Text fontSize="sm" fontWeight="bold">
                  markzuckerberg
                </Text>
                <Image src="/verified.png" w={4} h={4} ml={1} />
              </Flex>
              <Flex gap={4} align="center">
                <Text fontStyle="sm" color="gray.light">
                  1d
                </Text>
                <BsThreeDots />
              </Flex>
            </Flex>
            <Text fontSize="sm">{postTitle}</Text>
            {postImg && (
              <Box
                borderRadius={6}
                overflow="hidden"
                border="1px solid"
                borderColor="gray.light"
              >
                <Image src={postImg} w="full" />
              </Box>
            )}
            <Flex gap={3} my={1}>
              <Actions />
            </Flex>
            <Flex gap={2} align="center">
              <Text color="gray.light" fontSize="sm">
                {replies}
              </Text>
              <Box w={0.5} h={0.5} borderRadius="full" bg="gray.light" />
              <Text color="gray.light" fontSize="sm">
                {likes}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </>
  );
}

UserPost.propTypes = {
  postImg: PropTypes.string,
  postTitle: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  replies: PropTypes.number.isRequired,
};

UserPost.defaultProps = {
  postImg: "",
};

export default UserPost;
