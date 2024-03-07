// Components
import LogoutButton from "../components/auth/LogoutButton";
import CreatePost from "../components/CreatePost";

// UI
import { Flex, useColorMode, Button, Box } from "@chakra-ui/react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { TbSmartHome } from "react-icons/tb";
import { HiOutlineUser } from "react-icons/hi2";
import Logo from "../assets/icons/Logo";

// Navigation
import { useNavigate } from "react-router-dom";

// React-Redux
import { useSelector } from "react-redux";

const SideBar = () => {
  const { username } = useSelector((state) => state.app);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <Flex
      className="scroll"
      flexDirection="column"
      justifyContent="space-between"
      paddingX={4}
      paddingBottom={4}
      height="100vh"
      overflowY="scroll"
    >
      <Flex flexDirection="column">
        <Box aria-label="Logo" m={4}>
          <Logo colorMode={colorMode} width="32" height="32" />
        </Box>
        <Flex flexDirection="column" gap={4}>
          <Button
            leftIcon={<TbSmartHome size="32px" />}
            aria-label="Home"
            variant="ghost"
            fontSize="sm"
            justifyContent="flex-start"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Button>

          <Button
            leftIcon={
              colorMode === "dark" ? (
                <MdOutlineDarkMode size={32} />
              ) : (
                <MdOutlineLightMode size={32} />
              )
            }
            justifyContent="flex-start"
            aria-label="Color Mode"
            variant="ghost"
            fontSize="sm"
            onClick={toggleColorMode}
          >
            Theme
          </Button>

          <Button
            leftIcon={<HiOutlineUser size={32} />}
            aria-label="Profile"
            justifyContent="flex-start"
            variant="ghost"
            fontSize="sm"
            onClick={() => navigate(`/${username}`)}
          >
            Profile
          </Button>
          <CreatePost />
        </Flex>
      </Flex>
      <Flex>
        <LogoutButton />
      </Flex>
    </Flex>
  );
};

export default SideBar;
