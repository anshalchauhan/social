// React
import { useState } from "react";

// UI
import { Divider, Flex, Avatar, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

// Validation
import PropTypes from "prop-types";

//  Components
import Actions from "./Actions";

function Comment({ userAvatar, createdAt, comment, userName, likes }) {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex gap={4} py={2} my={2} w="full">
        <Avatar src={userAvatar} size="sm" />
        <Flex gap={1} w="full" direction="column">
          <Flex w="full" justify="space-between" align="center">
            <Text fontSize="sm" fontWeight="bold">
              {userName}
            </Text>
            <Flex gap={4}>
              <Text fontSize="sm" color="gray.light">
                {createdAt}
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text>{comment}</Text>
          <Actions liked={liked} setLiked={setLiked} />
          <Text fontSize="sm" color="gray.light">
            {likes + (liked ? 1 : 0)} likes
          </Text>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
}

Comment.propTypes = {
  userAvatar: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  comment: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
};

export default Comment;
