import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectIsLoading,
  selectError,
} from "../redux/private/selectorsPrivate";

export const usePrivate = () => {
  const privateDispatch = useDispatch(); // Add dispatch for triggering actions
  const privateUser = useSelector(selectUser) || null;
  const privateLoading = useSelector(selectIsLoading);
  const privateError = useSelector(selectError) || null;

  return {
    privateDispatch,
    privateUser,
    privateLoading,
    privateError,
  };
};
