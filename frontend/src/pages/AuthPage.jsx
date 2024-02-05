// UI
import { Flex, Input } from "@chakra-ui/react";

const AuthPage = () => {
  return (
    <Flex>
      <Input placeholder="name" />
      <Input placeholder="username" />
      <Input placeholder="email" />
      <Input placeholder="password" />
    </Flex>
  );
};

export default AuthPage;
