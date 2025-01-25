import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectIsLoading,
  selectError,
  selectMessage,
} from "../redux/private/selectorsPrivate";

export const usePrivate = () => {
  const privateDispatch = useDispatch(); // Add dispatch for triggering actions
  const privateUser = useSelector(selectUser) || null;
  const privateLoading = useSelector(selectIsLoading);
  const privateError = useSelector(selectError) || null;
  const privateMessage = useSelector(selectMessage) || null;

  return {
    privateDispatch,
    privateUser,
    privateLoading,
    privateError,
    privateMessage,
  };
};
