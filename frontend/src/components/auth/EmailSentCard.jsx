// UI
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

function EmailSentCard() {
  return (
    <Flex mt={16} direction="column" gap={8} align="center">
      <Flex
        bg={useColorModeValue("white", "gray.dark")}
        p={8}
        boxShadow="lg"
        rounded="lg"
        direction="column"
        align="center"
        gap={6}
        w={{
          base: "full",
          sm: "400px",
        }}
      >
        <Text textAlign="center">
          Instructions to reset your password has been sent to your email id!
        </Text>
      </Flex>
    </Flex>
  );
}

export default EmailSentCard;
