import { useDispatch, useSelector } from "react-redux";
import {
  selectHelpMailState,
  selectHelpEmail,
  selectHelpComment,
  selectHelpLoading,
  selectHelpSuccessMessage,
  selectHelpError,
} from "../redux/public/selectorsHelp";

export const usePublic = () => {
  const dispatch = useDispatch(); // Add dispatch for triggering actions
  const helpMailState = useSelector(selectHelpMailState);
  const helpEmail = useSelector(selectHelpEmail);
  const helpComment = useSelector(selectHelpComment);
  const helpLoading = useSelector(selectHelpLoading);
  const helpSuccessMessage = useSelector(selectHelpSuccessMessage);
  const helpError = useSelector(selectHelpError);

  return {
    helpMailState,
    helpEmail,
    helpComment,
    helpLoading,
    helpSuccessMessage,
    helpError,
    dispatch, // Include dispatch in the returned object
  };
};
