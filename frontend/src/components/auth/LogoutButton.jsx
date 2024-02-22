// React
import { useEffect } from "react";

// UI
import { Button, Spinner } from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";

// Hooks
import useShowToast from "../../hooks/useShowToast";

// Redux
import { useDispatch } from "react-redux";
import { setUser } from "../../store/store";

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
    localStorage.removeItem("user");
    localStorage.removeItem("verify-otp-email");
    logout();
  };

  useEffect(() => {
    if (isSuccess) showToast("Success", logoutData.message, "success");
    else if (isError) showToast("Error", error.data.message, "error");
  }, [showToast, isSuccess, logoutData, isError, error]);

  return (
    <Button
      position="fixed"
      top="30px"
      right="30px"
      size="sm"
      onClick={handleLogout}
    >
      {isLoading ? <Spinner /> : <MdLogout size={20} />}
    </Button>
  );
}

export default LogoutButton;
