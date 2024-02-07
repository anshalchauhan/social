// React
import { useState } from "react";

// UI
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

// Navigation
import { useParams } from "react-router-dom";

// Context
import { useAppContext } from "../../context/Context";

// Hooks
import useShowToast from "../../hooks/useShowToast";

const ResetPasswordCard = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Handling Inputs
  const [password, setPassword] = useState("");

  // Context
  const { setUser } = useAppContext();

  // Toast Hook
  const showToast = useShowToast();

  // Navigation
  const { token } = useParams();

  const handleResetPassword = async () => {
    try {
      const res = await fetch(`/api/v1/auth/reset-password/${token}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.message, "error");
        return;
      }

      localStorage.setItem("user-social", JSON.stringify(data.user));
      setUser(localStorage.getItem("user-social"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex mt={16} direction={"column"} gap={8} align="center">
      <Flex>
        <Heading as="h1" size="xl">
          Reset Password
        </Heading>
      </Flex>
      <Flex
        bg={useColorModeValue("white", "gray.dark")}
        p={8}
        boxShadow={"lg"}
        rounded={"lg"}
        direction={"column"}
        gap={6}
        w={{
          base: "full",
          sm: "400px",
        }}
      >
        <Text fontSize="md">Please set your new password</Text>
        <FormControl isRequired>
          <FormLabel>New Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
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
          onClick={handleResetPassword}
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};

export default ResetPasswordCard;
