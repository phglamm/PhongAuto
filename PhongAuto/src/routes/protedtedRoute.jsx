import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/counterSlice"; // Adjust the import path as necessary
import { duongdan } from "./index"; // Adjust the import path as necessary
import PropTypes from "prop-types"; // Import PropTypes for type checking

const ProtectedRoute = ({ children, roles = [] }) => {
  const user = useSelector(selectUser);

  // Check if the user is not logged in or doesn't have a role
  if (!user || !user.role) {
    return <Navigate to={duongdan.login} />;
  }

  // Ensure roles is an array and check if the user's role is in the allowed roles array
  if (!Array.isArray(roles) || !roles.includes(user.role)) {
    return <Navigate to={duongdan.notfound} />;
  }

  // If user has the required role, render the children components
  return children;
};

// Define PropTypes for type checking
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
