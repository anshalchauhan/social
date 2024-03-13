// React
import { useEffect, useRef } from "react";

// UI
import { Textarea } from "@chakra-ui/react";

// Validation
import PropTypes from "prop-types";

const ResizeTextArea = ({ placeholder, val, setVal }) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.style.height = textAreaRef.current.style.fontSize;
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [val]);

  return (
    <Textarea
      w="full"
      minH="unset"
      resize="none"
      overflow="hidden"
      variant="flushed"
      ref={textAreaRef}
      placeholder={placeholder}
      value={val}
      onChange={(e) => setVal(e.target.value)}
    />
  );
};

ResizeTextArea.propTypes = {
  placeholder: PropTypes.string.isRequired,
  val: PropTypes.string.isRequired,
  setVal: PropTypes.func.isRequired,
};

export default ResizeTextArea;
