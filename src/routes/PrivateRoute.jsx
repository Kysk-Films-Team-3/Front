
export const PrivateRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : null;
};

