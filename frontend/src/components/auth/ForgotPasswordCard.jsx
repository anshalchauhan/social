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
  FormLabel,
  Input,
  Link,
} from "@chakra-ui/react";

// Context
import { useAppContext } from "../../context/Context";

// Hooks
import useShowToast from "../../hooks/useShowToast";

// Navigation
import { useNavigate } from "react-router-dom";

const ForgotPasswordCard = ({ active, setActive }) => {
  // Handling Inputs
  const [email, setEmail] = useState("");

  // Context
  const { setUser } = useAppContext();

  // Toast Hook
  const showToast = useShowToast();

  // Navigation
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const res = await fetch("/api/v1/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.message, "error");
        return;
      }

      navigate("/auth/email-sent");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Flex mt={16} direction={"column"} gap={8} align="center">
      <Flex>
        <Heading as="h1" size="lg">
          Forgot your Password?
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
        <Text fontSize="sm">
          Enter your email address and we will send you instructions to reset
          your password.
        </Text>
        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
          onClick={handleForgotPassword}
        >
          Send Request
        </Button>
        <Link
          color={useColorModeValue("blue.500", "blue.400")}
          onClick={() => {
            setActive("login");
          }}
        >
          {"<"} Return to login
        </Link>
      </Flex>
    </Flex>
  );
};

export default ForgotPasswordCard;
