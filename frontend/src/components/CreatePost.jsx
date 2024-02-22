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
  Textarea,
  Text,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

// React-Redux
import { useSelector } from "react-redux";

// Hooks
import usePreviewMedia from "../hooks/usePreviewMedia";
import useShowToast from "../hooks/useShowToast";
import useBase64ToBlob from "../hooks/useBase64ToBlob";

// Redux Toolkit Query
import { useGetS3Query, useCreatePostMutation } from "../store/store";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const fileRef = useRef(null);
  const showToast = useShowToast();
  const base64ToBlob = useBase64ToBlob();
  const user = useSelector((state) => state.app.user);

  const { handleMediaChange, imgUrl, setImgUrl, videoAsset, setVideoAsset } =
    usePreviewMedia();

  // Redux Toolkit Query
  const { data: dataS3 } = useGetS3Query();
  const [createPost, { data: postData, isLoading, isSuccess, isError, error }] =
    useCreatePostMutation();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (imgUrl) {
      // Decoding base64 image to blob
      const blob = base64ToBlob(imgUrl, "image/jpeg");

      await fetch(dataS3.url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: blob,
        ContentEncoding: "base64",
        ContentType: "image/jpeg",
      });
    } else if (videoAsset) {
      await fetch(dataS3.url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: videoAsset,
        ContentType: videoAsset?.type,
      });
    }

    // Upload Image
    createPost({
      postedBy: user,
      text: postText,
      media: imgUrl || videoAsset ? dataS3.url.split("?")[0] : null,
      type: imgUrl ? "image" : "video",
    });
  };

  useEffect(() => {
    console.log("hi");
    if (isSuccess) {
      showToast("Success", postData.message, "success");
      onClose();
      setImgUrl(null);
      setVideoAsset(null);
      setPostText("");
    } else if (isError) showToast("Error", error.data.message, "error");
  }, [
    showToast,
    isSuccess,
    isError,
    postData,
    error,
    onClose,
    setImgUrl,
    setVideoAsset,
    setPostText,
  ]);

  return (
    <>
      <Button
        position="fixed"
        bottom={10}
        right={10}
        leftIcon={<AddIcon />}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      >
        Post
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setImgUrl(null);
          setVideoAsset(null);
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
                  {imgUrl || videoAsset ? (
                    <>
                      <IconButton
                        size="24px"
                        position="absolute"
                        variant="ghost"
                        top={2}
                        right={2}
                        onClick={() => {
                          setImgUrl(null);
                          setVideoAsset(null);
                        }}
                        icon={<MdOutlineCancel size="24px" />}
                        zIndex={50}
                      />
                      {imgUrl ? (
                        <Image
                          overflow="hidden"
                          src={imgUrl}
                          alt="Uploaded Image"
                        />
                      ) : (
                        <video className="video" width="full" controls loop>
                          <source
                            src={videoAsset?.url}
                            type={videoAsset?.type}
                          ></source>
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
                <Textarea
                  placeholder="Post content goes here..."
                  onChange={(e) => {
                    setPostText(e.target.value);
                  }}
                  value={postText}
                />
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreatePost}>
              {isLoading ? <Spinner /> : "Post"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
