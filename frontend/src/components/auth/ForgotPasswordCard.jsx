// React
import { useState, useEffect } from "react";

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
  Box,
  Spinner,
} from "@chakra-ui/react";

// Valdiation
import PropTypes from "prop-types";

// Navigation
import { useNavigate } from "react-router-dom";

// Hooks
import useShowToast from "../../hooks/useShowToast";

// Redux Toolkit Query
import { useForgotPasswordMutation } from "../../store/store";

function ForgotPasswordCard({ setActive }) {
  const showToast = useShowToast();
  const navigate = useNavigate();

  // Handling Inputs
  const [email, setEmail] = useState("");

  // Redux Toolkit Query
  const [forgotPassword, { isLoading, isSuccess, isError, error }] =
    useForgotPasswordMutation();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    forgotPassword({
      email,
    });
  };

  useEffect(() => {
    if (isSuccess) navigate("/auth/email-sent");
    else if (isError) showToast("Error", error.data.message, "error");
  }, [showToast, navigate, isSuccess, isError, error]);

  return (
    <Flex mt={16} direction="column" gap={8} align="center">
      <Flex>
        <Heading as="h1" size="lg">
          Forgot your Password?
        </Heading>
      </Flex>
      <Flex
        bg={useColorModeValue("white", "gray.dark")}
        p={8}
        boxShadow="lg"
        rounded="lg"
        direction="column"
        gap={4}
        w={{
          base: "full",
          sm: "400px",
        }}
      >
        <Text fontSize="sm">
          Enter your email address and we will send you instructions to reset
          your password.
        </Text>
        <form onSubmit={handleForgotPassword}>
          <Flex direction="column" gap={3}>
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
              w="full"
              bg={useColorModeValue("gray.600", "gray.700")}
              color="white"
              _hover={{
                bg: useColorModeValue("gray.700", "gray.800"),
              }}
              type="submit"
            >
              {isLoading ? <Spinner /> : "Send Request"}
            </Button>
            <Box
              as="button"
              type="button"
              alignSelf="start"
              color={useColorModeValue("blue.500", "blue.400")}
              _hover={{
                textDecoration: "underline",
              }}
              onClick={() => {
                setActive("login");
              }}
            >
              {"<"} Return to login
            </Box>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
}

ForgotPasswordCard.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export default ForgotPasswordCard;
