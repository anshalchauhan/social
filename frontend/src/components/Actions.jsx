// UI
import { Flex } from "@chakra-ui/react";
import Like from "../assets/icons/Like";
import Comment from "../assets/icons/Comment";
import Repost from "../assets/icons/Repost";
import Share from "../assets/icons/Share";

const Actions = ({ liked, setLiked }) => {
  return (
    <Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
      <Like liked={liked} setLiked={setLiked} />
      <Comment />
      <Repost />
      <Share />
    </Flex>
  );
};

export default Actions;
