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
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

// Context
import { useAppContext } from "../../context/Context";

// Hooks
import useShowToast from "../../hooks/useShowToast";

const LoginCard = ({ active, setActive }) => {
  // State
  const [showPassword, setShowPassword] = useState(false);

  // Context
  const { setUser } = useAppContext();

  // Toast Hook
  const showToast = useShowToast();

  // Handling Inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();
      if (data.error) {
        console.log(data);
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
          Login
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
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <Flex direction={"column"} w={"full"} gap={2}>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Link
            fontSize={"sm"}
            color={useColorModeValue("blue.500", "blue.400")}
            onClick={() => {
              setActive("forgotpassword");
            }}
            alignSelf={"flex-end"}
          >
            Forgot Password?
          </Link>
        </Flex>
        <Button
          loadingText="Submitting"
          size="lg"
          w={"full"}
          mb={4}
          bg={useColorModeValue("gray.600", "gray.700")}
          color={"white"}
          _hover={{
            bg: useColorModeValue("gray.700", "gray.800"),
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Text>
          Don't have an account?{" "}
          <Link
            color={useColorModeValue("blue.500", "blue.400")}
            onClick={() => {
              setActive("signup");
            }}
          >
            Sign up
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default LoginCard;
