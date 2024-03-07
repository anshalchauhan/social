// React
import { useState, useRef, useEffect } from "react";

// UI
import {
  Box,
  Flex,
  Image,
  Button,
  useColorModeValue,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Text,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

// Components
import ResizeTextArea from "./ResizeTextArea";

// React-Redux
import { useSelector } from "react-redux";

// Hooks
import usePreviewMedia from "../hooks/usePreviewMedia";
import useShowToast from "../hooks/useShowToast";

// Redux Toolkit Query
import { useGetS3Query, useCreatePostMutation } from "../store/store";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const fileRef = useRef(null);
  const showToast = useShowToast();
  const user = useSelector((state) => state.app.user);

  const { handleMediaChange, media, setMedia } = usePreviewMedia();

  // Redux Toolkit Query
  const { data: dataS3, refetch } = useGetS3Query();
  const [createPost, { data: postData, isLoading, isSuccess, isError, error }] =
    useCreatePostMutation();

  const handleCreatePost = async (e) => {
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

    // Upload Image
    createPost({
      postedBy: user,
      text: postText,
      media: media ? dataS3.url.split("?")[0] : null,
      type: media?.type,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      showToast("Success", postData.message, "success");
      onClose();
      setMedia(null);
      setPostText("");
    } else if (isError) showToast("Error", error.data.message, "error");
  }, [
    refetch,
    showToast,
    isSuccess,
    isError,
    postData,
    error,
    onClose,
    setMedia,
    setPostText,
  ]);

  return (
    <>
      <Button
        leftIcon={<LuImagePlus size={32} />}
        aria-label="Create Post"
        variant="ghost"
        justifyContent="flex-start"
        fontSize="sm"
        onClick={onOpen}
      >
        Create Post
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setMedia(null);
          setPostText("");
        }}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent bg={useColorModeValue("white", "gray.dark")}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" gap={4}>
              <Flex flexDirection="column" gap={2}>
                <Text>Post a media to your account</Text>
                <Flex
                  w="full"
                  h={300}
                  border="2px dashed"
                  borderRadius={12}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  {media ? (
                    <>
                      <IconButton
                        size="24px"
                        position="absolute"
                        variant="ghost"
                        top={2}
                        right={2}
                        onClick={() => {
                          setMedia(null);
                        }}
                        icon={<MdOutlineCancel size="24px" />}
                        zIndex={50}
                      />
                      {media?.type.startsWith("image/") ? (
                        <Image
                          overflow="hidden"
                          src={media?.url}
                          alt="Uploaded Image"
                        />
                      ) : (
                        <video className="video" width="full" controls loop>
                          <source src={media?.url} type={media?.type}></source>
                        </video>
                      )}
                    </>
                  ) : (
                    <>
                      <Box>
                        <FaCloudUploadAlt size="72px" />
                      </Box>
                      <Button onClick={() => fileRef.current.click()}>
                        Browse File
                      </Button>
                      <input
                        type="file"
                        hidden
                        name="upload-file"
                        ref={fileRef}
                        onChange={handleMediaChange}
                      />
                    </>
                  )}
                </Flex>
              </Flex>
              <FormControl>
                <ResizeTextArea
                  placeholder="Post content goes here..."
                  val={postText}
                  setVal={setPostText}
                />
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              isDisabled={postText ? false : true}
              mr={3}
              onClick={handleCreatePost}
            >
              {isLoading ? <Spinner /> : "Post"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
