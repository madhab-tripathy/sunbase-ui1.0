import { Navigate, Outlet } from "react-router-dom";
import { isLoggin } from "../auth";

const PrivateRoute = ()=>{
    return isLoggin() ? <Outlet /> : <Navigate to="/" />;
}
export default PrivateRoute;