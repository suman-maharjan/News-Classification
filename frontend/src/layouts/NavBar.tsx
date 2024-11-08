import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/sessions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { _updateUserPreference } from "@/redux/userPreference/userPreferenceSlice";

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

  const { loggedIn } = useAppSelector(
    (state: RootState) => state.userPreference
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    navigate("/");
    dispatch({ type: "reset" });
  };
  const handleSettings = () => {};

  const profileActions = [
    { label: "Settings", action: handleSettings },
    { label: "Logout", action: handleLogout },
  ];
  return (
    loggedIn && (
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="bg-base-300 shadow-lg">
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
