import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ isLoggedIn, children }) => {
    const location = useLocation();

    if (isLoggedIn) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};
