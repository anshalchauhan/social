// Validation
import PropTypes from "prop-types";

function ReplyAction({ setReply }) {
  return (
    <svg
      aria-label="Reply"
      color=""
      fill=""
      height="20"
      role="img"
      viewBox="0 0 24 24"
      width="20"
      onClick={() => setReply((prev) => !prev)}
    >
      <title>Reply</title>
      <path
        d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

ReplyAction.propTypes = {
  reply: PropTypes.bool.isRequired,
  setReply: PropTypes.func.isRequired,
};

export default ReplyAction;
