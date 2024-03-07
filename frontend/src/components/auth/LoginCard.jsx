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

// Valdiation
import PropTypes from "prop-types";

// Hooks
import useShowToast from "../../hooks/useShowToast";

// Redux
import { useDispatch } from "react-redux";
// import { setUser } from "../../store/store";
import { setUser, setUsernameState } from "../../store/store";

// Redux Toolkit Query
import { useLoginMutation } from "../../store/store";

function LoginCard({ setActive }) {
  const [showPassword, setShowPassword] = useState(false);
  const showToast = useShowToast();
  const dispatch = useDispatch();

  // Handling Inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Redux Toolkit Query
  const [login, { data: loginData, isLoading, isSuccess, isError, error }] =
    useLoginMutation();

  const handleLogin = (e) => {
    e.preventDefault();
    login({
      username,
      password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      showToast("Success", loginData.message, "success");
      localStorage.setItem("user", loginData.user._id);
      localStorage.setItem("username", loginData.user.username);
      dispatch(setUser(loginData.user._id));
      dispatch(setUsernameState(loginData.user.username));
    } else if (isError) showToast("Error", error.data.message, "error");
  }, [showToast, dispatch, isSuccess, isError, loginData, error]);

  return (
    <Flex mt={16} direction="column" gap={8} align="center">
      <Flex>
        <Heading as="h1" size="xl">
          Login
        </Heading>
      </Flex>
      <form onSubmit={handleLogin}>
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
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <Flex direction="column" w="full" gap={2}>
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
            <Box
              as="button"
              type="button"
              fontSize="sm"
              color={useColorModeValue("blue.500", "blue.400")}
              _hover={{
                textDecoration: "underline",
              }}
              onClick={() => {
                setActive("forgotpassword");
              }}
              alignSelf="flex-end"
            >
              Forgot Password?
            </Box>
          </Flex>
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
            {isLoading ? <Spinner /> : "Login"}
          </Button>
          <Text>
            Don&apos;t have an account?{" "}
            <Box
              as="button"
              type="button"
              color={useColorModeValue("blue.500", "blue.400")}
              _hover={{
                textDecoration: "underline",
              }}
              onClick={() => {
                setActive("signup");
              }}
            >
              Sign up
            </Box>
          </Text>
        </Flex>
      </form>
    </Flex>
  );
}

LoginCard.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export default LoginCard;
