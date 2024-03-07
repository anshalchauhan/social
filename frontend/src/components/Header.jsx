// UI
import {
  IconButton,
  Box,
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Logo from "../assets/icons/Logo";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";

// Components
import LogoutButton from "../components/auth/LogoutButton";
import CreatePost from "../components/CreatePost";

// React-Redux
import { useSelector } from "react-redux";

// Navigation
import { useNavigate } from "react-router-dom";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, username } = useSelector((state) => state.app);
  const navigate = useNavigate();

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
