// React
import { useEffect, useState } from "react";

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
  Box,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

// Validation
import PropTypes from "prop-types";

// Hooks
import useShowToast from "../../hooks/useShowToast";

// Redux Toolkit Query
import { useSignupMutation } from "../../store/store";

function SignupCard({ setActive }) {
  const [showPassword, setShowPassword] = useState(false);
  const showToast = useShowToast();

  // Handling Inputs
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signup, { isLoading, isSuccess, isError, error }] =
    useSignupMutation();

  const handleSignup = (e) => {
    e.preventDefault();
    signup({
      name,
      username,
      email,
      password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("verify-otp-email", email);
      setActive("verifyotp");
    } else if (isError) showToast("Error", error.data.message, "error");
  }, [showToast, isSuccess, isError, error, email, setActive]);

  return (
    <Flex mt={16} direction="column" gap={8} align="center">
      <Flex>
        <Heading as="h1" size="xl">
          Sign up
        </Heading>
      </Flex>
      <form onSubmit={handleSignup}>
        <Flex
          bg={useColorModeValue("white", "gray.dark")}
          p={8}
          boxShadow="lg"
          rounded="lg"
        >
          <Flex direction="column" gap={8} align="center">
            <Flex direction="column" gap={6}>
              <Flex gap={2}>
                <FormControl isRequired>
                  <FormLabel>Full name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
              </Flex>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h="full">
                    <Button
                      variant="ghost"
                      onClick={() => setShowPassword((prevValue) => !prevValue)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color="white"
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}
              >
                {isLoading ? <Spinner /> : "Sign up"}
              </Button>
            </Flex>
            <Text>
              Already a user?{" "}
              <Box
                as="button"
                type="button"
                color={useColorModeValue("blue.500", "blue.400")}
                _hover={{
                  textDecoration: "underline",
                }}
                onClick={() => {
                  setActive("login");
                }}
              >
                Login
              </Box>
            </Text>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}

SignupCard.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export default SignupCard;
