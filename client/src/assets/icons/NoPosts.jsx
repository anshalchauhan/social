// Validation
import PropTypes from "prop-types";

function NoPosts({ colorMode, width, height }) {
  const color = colorMode === "dark" ? "#fff" : "#000";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      width={width}
      height={height}
      data-name="Layer 1"
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-13.5c-1.379,0-2.5,1.121-2.5,2.5s1.121,2.5,2.5,2.5,2.5-1.121,2.5-2.5-1.121-2.5-2.5-2.5Zm0,4c-.827,0-1.5-.673-1.5-1.5s.673-1.5,1.5-1.5,1.5.673,1.5,1.5-.673,1.5-1.5,1.5Zm3.5-6.5h-.727l-.843-1.311c-.277-.432-.748-.689-1.262-.689h-1.338c-.514,0-.984.258-1.262.688l-.843,1.312h-.727c-1.379,0-2.5,1.121-2.5,2.5v5c0,1.379,1.121,2.5,2.5,2.5h7c1.379,0,2.5-1.121,2.5-2.5v-5c0-1.379-1.121-2.5-2.5-2.5Zm-4.589-.771c.092-.143.249-.229.42-.229h1.338c.171,0,.328.086.42.229l.495.771h-3.168l.495-.771Zm6.089,8.271c0,.827-.673,1.5-1.5,1.5h-7c-.827,0-1.5-.673-1.5-1.5v-5c0-.827.673-1.5,1.5-1.5h1.008s.002,0,.003,0h5.988c.827,0,1.5.673,1.5,1.5v5Z" />
    </svg>
  );
}

NoPosts.propTypes = {
  colorMode: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default NoPosts;
