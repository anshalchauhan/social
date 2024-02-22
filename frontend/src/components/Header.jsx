// UI
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import Logo from "../assets/icons/Logo";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justify="center" mt={6} mb={12}>
      <Box cursor="pointer" aria-label="Logo" onClick={toggleColorMode}>
        <Logo colorMode={colorMode} width="24" height="24" />
      </Box>
    </Flex>
  );
}

export default Header;
