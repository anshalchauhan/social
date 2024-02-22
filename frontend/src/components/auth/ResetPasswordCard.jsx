// React
import { useState, useEffect } from "react";

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
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

// Navigation
import { useParams } from "react-router-dom";

// Hooks
import useShowToast from "../../hooks/useShowToast";

// Redux
import { useDispatch } from "react-redux";
import { setUser } from "../../store/store";

// Redux Toolkit Query
import { useResetPasswordMutation } from "../../store/store";

function ResetPasswordCard() {
  const [showPassword, setShowPassword] = useState(false);
  const showToast = useShowToast();
  const dispatch = useDispatch();
  const { token } = useParams();

  // Handling Inputs
  const [password, setPassword] = useState("");

  // Redux Toolkit Query
  const [
    resetPassword,
    { data: resetPasswordData, isLoading, isSuccess, isError, error },
  ] = useResetPasswordMutation();

  const handleResetPassword = (e) => {
    e.preventDefault();
    resetPassword({
      password,
      token,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      showToast("Success", resetPasswordData.message, "success");
      localStorage.setItem("user", resetPasswordData.user._id);
      dispatch(setUser(resetPasswordData.user._id));
    } else if (isError) showToast("Error", error.data.message, "error");
  }, [showToast, dispatch, isSuccess, isError, resetPasswordData, error]);

  return (
    <Flex mt={16} direction="column" gap={8} align="center">
      <Flex>
        <Heading as="h1" size="xl">
          Reset Password
        </Heading>
      </Flex>
      <Flex
        bg={useColorModeValue("white", "gray.dark")}
        p={8}
        boxShadow="lg"
        rounded="lg"
        direction="column"
        gap={6}
        w={{
          base: "full",
          sm: "400px",
        }}
      >
        <Text fontSize="md">Please set your new password</Text>
        <form onSubmit={handleResetPassword}>
          <FormControl isRequired>
            <FormLabel>New Password</FormLabel>
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
            loadingText="Submitting"
            size="lg"
            w="full"
            mt={4}
            bg={useColorModeValue("gray.600", "gray.700")}
            color="white"
            _hover={{
              bg: useColorModeValue("gray.700", "gray.800"),
            }}
            type="submit"
          >
            {isLoading ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </Flex>
    </Flex>
  );
}

export default ResetPasswordCard;
