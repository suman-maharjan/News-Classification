import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppSelector } from "@/hooks/redux";
import { useAuth } from "@/hooks/useAuth";
import { useEventHandler } from "@/hooks/useEventHandler";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar bg-base-200 fixed z-10 px-8">
      <div className="flex-1">
        <a href="/" className="btn text-xl">
          News Classification
        </a>
      </div>

      <ProfileAction />
    </nav>
  );
};

const ProfileAction = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { logoutMutate } = useAuth();

  const dispatch = useDispatch();
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);
  const { handleError, handleSuccess } = useEventHandler();

  const navigate = useNavigate();
  const handleLogout = () => {
    logoutMutate(null, {
      onSuccess: () => {
        dispatch({ type: "reset" });
        handleSuccess("Successfully Logged Out");
        navigate("/");
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };
  const handleSettings = () => {};

  const profileActions = [
    { label: "Settings", action: handleSettings },
    { label: "Logout", action: handleLogout },
  ];
  return (
    isUserLoggedIn && (
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="bg-base-300 shadow-lg text-white">
          <div className="flex flex-col gap-2  rounded-lg">
            {profileActions.map((action, index) => (
              <div
                key={index}
                className="hover:cursor-pointer"
                onClick={() => {
                  setPopoverOpen(false);
                  action.action();
                }}
              >
                {action.label}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    )
  );
};

export default NavBar;
