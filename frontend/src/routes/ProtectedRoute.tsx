import { Navigate,Outlet } from "react-router-dom";

import useAuthStore from "../store/authStore";




const ProtectedRoute = () => {
    const token = useAuthStore(
        (state)=>state.token
    );

    if(!token){
        return <Navigate to="/login" replace={true} />
    }
    return <Outlet />
};

export default ProtectedRoute;