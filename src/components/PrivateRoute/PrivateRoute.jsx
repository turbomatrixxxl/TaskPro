import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../commonComponents/Loader";// Ensure this hook is correctly imported

const PrivateRoute = ({ component, redirectTo = "/" }) => {
  const { isLoggedIn, isRefreshing, user } = useAuth();
  console.log("isLoggedIn:", isLoggedIn);
  console.log("isRefreshing:", isRefreshing);
  console.log("user:", user);



  // If the app is refreshing, we don't redirect just yet
  if (isRefreshing) {
    return <Loader />; // Or show a loader
  }

  // If the user is not logged in or not verified, redirect them
  if (!isLoggedIn || user?.verify === false) {
    return <Navigate to={redirectTo} />;
  }

  // Otherwise, render the component
  return component;
};


export default PrivateRoute;
