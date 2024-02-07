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

// Hooks
import useShowToast from "../../hooks/useShowToast";

export default function SignupCard({ active, setActive }) {
  // Toast Hook
  const showToast = useShowToast();

  const [showPassword, setShowPassword] = useState(false);
  // Handling Inputs
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.message, "error");
        return;
      }

      setActive("verifyotp");
      localStorage.setItem("verify-otp-email", email);
    } catch (err) {
      console.log(message);
    }
  };

  return (
    <Flex mt={16} direction={"column"} gap={8} align="center">
      <Flex>
        <Heading as="h1" size="xl">
          Sign up
        </Heading>
      </Flex>
      <Flex
        bg={useColorModeValue("white", "gray.dark")}
        p={8}
        boxShadow={"lg"}
        rounded={"lg"}
      >
        <Flex direction={"column"} gap={8} align={"center"}>
          <Flex direction={"column"} gap={6}>
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
            <Button
              loadingText="Submitting"
              size="lg"
              bg={useColorModeValue("gray.600", "gray.700")}
              color={"white"}
              _hover={{
                bg: useColorModeValue("gray.700", "gray.800"),
              }}
              onClick={handleSignup}
            >
              Sign up
            </Button>
          </Flex>
          <Text>
            Already a user?{" "}
            <Link
              color={useColorModeValue("blue.500", "blue.400")}
              onClick={() => {
                setActive("login");
              }}
            >
              Login
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
