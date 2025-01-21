import { useSelector } from "react-redux";
import {
  selectUser,
  selectAuthToken,
  selectAvatarURL,
  selectIsLoading,
  selectIsLoggedIn,
  selectIsisRegistered,
  selectIsRefreshing,
  selectError,
  selectIsemailResendStatus,
  selectIsLoggedOut,
  selectProjects,
} from "../redux/auth/selectorsAuth";

export const useAuth = () => {
  const user = useSelector(selectUser);
  const tokenAuth = useSelector(selectAuthToken);
  const avatarUrl = useSelector(selectAvatarURL);
  const isLoadingAuth = useSelector(selectIsLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRegistered = useSelector(selectIsisRegistered);
  const isRefreshing = useSelector(selectIsRefreshing);
  const errorAuth = useSelector(selectError);
  const emailResendStatus = useSelector(selectIsemailResendStatus);
  const isLoggedOut = useSelector(selectIsLoggedOut);
  const projects = useSelector(selectProjects);

  return {
    tokenAuth,
    isLoggedIn,
    user,
    errorAuth,
    isRefreshing,
    isLoadingAuth,
    isRegistered,
    emailResendStatus,
    isLoggedOut,
    avatarUrl,
    projects,
  };
};
