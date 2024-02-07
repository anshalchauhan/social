// UI
import { Button } from "@chakra-ui/react";

// Context
import { useAppContext } from "../../context/Context";

const LogoutButton = () => {
  // Context
  const { setUser } = useAppContext();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.message, "error");
      }
      localStorage.removeItem("user-social");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button
      position={"fixed"}
      top={"30px"}
      right={"30px"}
      size={"sm"}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
