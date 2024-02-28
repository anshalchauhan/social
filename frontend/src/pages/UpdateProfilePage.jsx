// React
import { useRef, useState, useEffect } from "react";

// UI
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
  Avatar,
  Spinner,
} from "@chakra-ui/react";

// Navigation
import { useParams, useNavigate } from "react-router-dom";

// Redux Toolkit Query
import {
  useGetS3Query,
  useUpdateUserMutation,
  useGetUserQuery,
} from "../store/store";

// Hooks
import useShowToast from "../hooks/useShowToast";
import usePreviewMedia from "../hooks/usePreviewMedia";

export default function UpdateProfilePage() {
  const showToast = useShowToast();
  const navigate = useNavigate();

  const { username: usernameUpdate } = useParams();
  // Redux Toolkit Query, GetUser data
  const { data: dataUser, refetch: getUserRefetch } =
    useGetUserQuery(usernameUpdate);

  // Handling Inputs
  const [name, setName] = useState(dataUser?.user.name);
  const [username, setUsername] = useState(dataUser?.user.username);
  const [bio, setBio] = useState(dataUser?.user.bio);
  const [password, setPassword] = useState("");

  // Profile Image handling
  const fileRef = useRef(null);
  const { handleMediaChange, media } = usePreviewMedia();

  // Redux Toolkit Query
  const { data: dataS3, refetch } = useGetS3Query();
  const [
    updateUser,
    { data: updateUserData, isLoading, isSuccess, isError, error },
  ] = useUpdateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (media) {
      await fetch(dataS3.url, {
        method: "PUT",
        headers: {
          "Content-Type": media?.type,
        },
        body: media,
      });
    }

    // Updating user profile
    updateUser({
      id: dataUser?.user._id,
      name,
      username,
      bio,
      profilePic: media ? dataS3.url.split("?")[0] : null,
      password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      getUserRefetch();
      showToast("Success", updateUserData.message, "success");
    } else if (isError) showToast("Error", error.data.message, "error");
  }, [
    refetch,
    getUserRefetch,
    showToast,
    isSuccess,
    isError,
    updateUserData,
    error,
  ]);

  return (
    <form onSubmit={handleSubmit}>
      <Flex align="center" justify="center" my={6}>
        <Flex
          gap={4}
          direction="column"
          w="full"
          maxW="md"
          bg={useColorModeValue("white", "gray.dark")}
          rounded="xl"
          boxShadow="lg"
          p={6}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>
          <FormControl>
            <Flex gap={6} align="center">
              <Avatar
                size="xl"
                boxShadow="md"
                src={media?.url || dataUser?.user.profilePic}
              />
              <Button w="full" onClick={() => fileRef.current.click()}>
                Change Avatar
              </Button>
              <Input
                type="file"
                hidden
                ref={fileRef}
                onChange={handleMediaChange}
              />
            </Flex>
          </FormControl>
          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="Your bio."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              _placeholder={{ color: "gray.500" }}
              type="password"
            />
          </FormControl>
          <Flex gap={6}>
            <Button
              bg="red.400"
              color="white"
              w="full"
              _hover={{
                bg: "red.500",
              }}
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
            <Button
              bg="green.400"
              color="white"
              w="full"
              _hover={{
                bg: "green.500",
              }}
              type="submit"
            >
              {isLoading ? <Spinner /> : "Submit"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
}
