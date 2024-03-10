// UI
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import Logo from "../assets/icons/Logo";

function Header() {
  const { colorMode } = useColorMode();

  return (
    <Flex
      w="full"
      height="48px"
      alignItems="center"
      position="sticky"
      top={0}
      zIndex={50}
    >
      <Box aria-label="Logo">
        <Logo colorMode={colorMode} width="24" height="24" />
      </Box>
    </Flex>
  );
}

export default Header;
