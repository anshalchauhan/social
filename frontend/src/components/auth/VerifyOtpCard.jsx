// React
import { useState, useEffect } from "react";

// UI
import {
  Flex,
  FormControl,
  Button,
  Heading,
  Text,
  Spinner,
  useColorModeValue,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";

// Hooks
import useShowToast from "../../hooks/useShowToast";

// Redux
import { useDispatch } from "react-redux";
import { setUser, setUsernameState } from "../../store/store";

// Redux Toolkit Query
import { useVerifyOtpMutation } from "../../store/store";

function VerifyOtpCard() {
  const showToast = useShowToast();
  const dispatch = useDispatch();

  // Handling Inputs
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");

  // Redux Toolkit Query
  const [verifyOtp, { data: otpData, isLoading, isSuccess, isError, error }] =
    useVerifyOtpMutation();

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const email = localStorage.getItem("verify-otp-email");
    const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;
    verifyOtp({
      email,
      otp,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      showToast("Success", otpData.message, "success");
      localStorage.setItem("user", otpData.user._id);
      localStorage.setItem("username", otpData.user.username);
      dispatch(setUser(otpData.user._id));
      dispatch(setUsernameState(otpData.user.username));
      localStorage.removeItem("verify-otp-email");
    } else if (isError) showToast("Error", error.data.message, "error");
  }, [showToast, dispatch, isSuccess, isError, otpData, error]);

  return (
    <Flex mt={16} direction="column" gap={8} align="center">
      <Flex>
        <Heading as="h1" size="xl">
          Enter OTP
        </Heading>
      </Flex>
      <Flex
        bg={useColorModeValue("white", "gray.dark")}
        p={8}
        boxShadow="lg"
        rounded="lg"
        align="center"
        direction="column"
        gap={6}
        w={{
          base: "full",
          sm: "400px",
        }}
      >
        <Text fontSize="sm" textAlign="center">
          We have sent a One Time Password to your email
        </Text>
        <FormControl isRequired>
          <Flex gap={3} justify="center">
            <PinInput otp placeholder="-">
              <PinInputField
                value={otp1}
                onChange={(e) => setOtp1(e.target.value)}
              />
              <PinInputField
                value={otp2}
                onChange={(e) => setOtp2(e.target.value)}
              />
              <PinInputField
                value={otp3}
                onChange={(e) => setOtp3(e.target.value)}
              />
              <PinInputField
                value={otp4}
                onChange={(e) => setOtp4(e.target.value)}
              />
              <PinInputField
                value={otp5}
                onChange={(e) => setOtp5(e.target.value)}
              />
              <PinInputField
                value={otp6}
                onChange={(e) => setOtp6(e.target.value)}
              />
            </PinInput>
          </Flex>
        </FormControl>
        <Button
          loadingText="Submitting"
          size="lg"
          w="full"
          mt={4}
          bg={useColorModeValue("gray.600", "gray.700")}
          color="white"
          _hover={{
            bg: useColorModeValue("gray.700", "gray.800"),
          }}
          onClick={handleVerifyOtp}
        >
          {isLoading ? <Spinner /> : "Verify OTP"}
        </Button>
      </Flex>
    </Flex>
  );
}

export default VerifyOtpCard;
