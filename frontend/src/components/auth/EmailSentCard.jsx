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

const EmailSentCard = () => {
  return (
    <Flex mt={16} direction={"column"} gap={8} align="center">
      <Flex
        bg={useColorModeValue("white", "gray.dark")}
        p={8}
        boxShadow={"lg"}
        rounded={"lg"}
        direction={"column"}
        align={"center"}
        gap={6}
        w={{
          base: "full",
          sm: "400px",
        }}
      >
        <Text textAlign={"center"}>
          Instructions to reset your password has been sent to your email id!
        </Text>
      </Flex>
    </Flex>
  );
};

export default EmailSentCard;
