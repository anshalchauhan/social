// UI
import { Divider, Flex, Avatar, Text } from "@chakra-ui/react";

// Validation
import PropTypes from "prop-types";

function Reply({ text, username, profilePic, repliedAt }) {
  // Date
  // Calculating how many days since reply was sent
  let days = new Date(repliedAt);
  days = Math.floor(Math.abs(Date.now() - days) / (24 * 60 * 60 * 1000));

  return (
    <>
      <Flex gap={4} py={2} my={2}>
        <Avatar src={profilePic} size="sm" />
        <Flex w="full" gap={1} direction="column">
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" fontWeight="bold">
              {username}
            </Text>
            <Text fontSize="sm" color="gray.light">
              {days ? `${days}d` : "today"}
            </Text>
          </Flex>
          <Text wordBreak="break-all" whiteSpace="pre-wrap">
            {text}
          </Text>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
}

Reply.propTypes = {
  text: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  repliedAt: PropTypes.string.isRequired,
};

export default Reply;
