// React
import { useEffect } from "react";

// UI
import { Button, Spinner } from "@chakra-ui/react";

// Hooks
import useShowToast from "../../hooks/useShowToast";

// React-Icons
import { IoLogOutOutline } from "react-icons/io5";

// Redux
import { useDispatch } from "react-redux";
import { setUser, setUsernameState } from "../../store/store";

// Redux Toolkit Query
import { useLogoutMutation } from "../../store/store";

function LogoutButton() {
  const showToast = useShowToast();
  const dispatch = useDispatch();

  // Redux Toolkit Query
  const [logout, { data: logoutData, isLoading, isSuccess, isError, error }] =
    useLogoutMutation();

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(setUsernameState(null));
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    localStorage.removeItem("verify-otp-email");
    logout();
    window.location.reload();
  };

  useEffect(() => {
    if (isSuccess) showToast("Success", logoutData.message, "success");
    else if (isError) showToast("Error", error.data.message, "error");
  }, [showToast, isSuccess, logoutData, isError, error]);

  return (
    <Button
      leftIcon={isLoading ? <Spinner /> : <IoLogOutOutline size={32} />}
      onClick={handleLogout}
      aria-label="Logout"
      justifyContent="flex-start"
      variant="ghost"
      fontSize="sm"
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
