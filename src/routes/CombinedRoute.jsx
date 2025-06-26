import { Navigate } from "react-router-dom";

/**
 * Combined PrivateRoute and RoleBasedRoute
 * 
 * @param {ReactNode} children - The component to render if authorized.
 * @param {Array} allowedRoles - Array of allowed roles (e.g., ["admin", "librarian", "student", "faculty"]).
 */
export default function CombinedRoute({ children, allowedRoles }) {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userRole = userData?.role;


  console.log("User Data:", userData);
  console.log("Allowed Roles:", allowedRoles);

  // User not logged in
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  // User logged in but role not allowed
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" replace />;
  }

  // User allowed
  return children;
}
