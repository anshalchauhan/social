// React
import { useState } from "react";

// UI
import {
  Flex,
  FormControl,
  Button,
  Heading,
  Text,
  useColorModeValue,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";

// Context
import { useAppContext } from "../../context/Context";

// Hooks
import useShowToast from "../../hooks/useShowToast";

const VerifyOtpCard = () => {
  // Toast Hook
  const showToast = useShowToast();

  // Context
  const { setUser } = useAppContext();

  // Handling Inputs
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");

  const handleVerifyOtp = async () => {
    try {
      const email = localStorage.getItem("verify-otp-email");
      const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;

      const res = await fetch("/api/v1/auth/verify-otp", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          otp,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.message, "error");
        return;
      }

      localStorage.removeItem("verify-otp-email");
      localStorage.setItem("user-social", JSON.stringify(data.user));
      setUser(localStorage.getItem("user-social"));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Flex mt={16} direction={"column"} gap={8} align="center">
      <Flex>
        <Heading as="h1" size="xl">
          Enter OTP
        </Heading>
      </Flex>
      <Flex
        bg={useColorModeValue("white", "gray.dark")}
        p={8}
        boxShadow={"lg"}
        rounded={"lg"}
        align={"center"}
        direction={"column"}
        gap={6}
        w={{
          base: "full",
          sm: "400px",
        }}
      >
        <Text fontSize="sm" textAlign={"center"}>
          We have sent a One Time Password to your email
        </Text>
        <FormControl isRequired>
          <Flex gap={3} justify={"center"}>
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
          w={"full"}
          mt={4}
          bg={useColorModeValue("gray.600", "gray.700")}
          color={"white"}
          _hover={{
            bg: useColorModeValue("gray.700", "gray.800"),
          }}
          onClick={handleVerifyOtp}
        >
          Verify OTP
        </Button>
      </Flex>
    </Flex>
  );
};

export default VerifyOtpCard;
