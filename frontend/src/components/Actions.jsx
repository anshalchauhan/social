// React
import { useState, useEffect } from "react";

// Validation
import PropTypes from "prop-types";

// UI
import { Box, Button, Flex, Spinner } from "@chakra-ui/react";

// Components
import LikeAction from "./icons/LikeAction";
import ReplyAction from "./icons/ReplyAction";
import RepostAction from "./icons/RepostAction";
import ShareAction from "./icons/ShareAction";
import ResizeTextArea from "./ResizeTextArea";
import Reply from "./Reply";

// Hooks
import useShowToast from "../hooks/useShowToast";

// Redux Toolkit Query
import { useReplyToPostMutation } from "../store/store";

function Actions({ postId, didLike, replies }) {
  const [liked, setLiked] = useState(didLike);
  const [reply, setReply] = useState(false);
  const [val, setVal] = useState("");
  const showToast = useShowToast();

  // Redux Toolkit Query
  const [
    replyToPost,
    { data: replyToPostData, isLoading, isSuccess, isError, error },
  ] = useReplyToPostMutation();

  const handleReplyPost = () => {
    replyToPost({
      postId,
      text: val,
    });
    setVal("");
  };

  useEffect(() => {
    if (isSuccess) showToast("Success", "Replied Successfully!", "success");
    else if (isError) showToast("Error", error.data.message, "error");
  }, [showToast, isSuccess, isError, replyToPostData, error]);

  return (
    <Flex flexDirection="column">
      <Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
        <LikeAction liked={liked} setLiked={setLiked} postId={postId} />
        <ReplyAction reply={reply} setReply={setReply} />
        <RepostAction />
        <ShareAction />
      </Flex>
      {reply && (
        <Flex flexDirection="column">
          <Flex gap={2} flexDirection="column">
            <ResizeTextArea
              placeholder={"Add a comment..."}
              val={val}
              setVal={setVal}
            />
            <Flex gap={2} alignSelf="end">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setVal("");
                  setReply((prev) => !prev);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                colorScheme="blue"
                isDisabled={val ? false : true}
                onClick={handleReplyPost}
              >
                {isLoading ? <Spinner /> : "Reply"}
              </Button>
            </Flex>
          </Flex>
          <Box className="scroll" overflowY="scroll" maxH="400px">
            {replies?.map((reply) => (
              <Reply
                key={reply._id}
                text={reply.text}
                username={reply.username}
                profilePic={reply.profilePic}
                repliedAt={reply.repliedAt}
              />
            ))}
          </Box>
        </Flex>
      )}
    </Flex>
  );
}

Actions.propTypes = {
  postId: PropTypes.string.isRequired,
  didLike: PropTypes.bool.isRequired,
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      profilePic: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      repliedAt: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default Actions;
