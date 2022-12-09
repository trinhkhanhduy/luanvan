import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const authen = useSelector((state) => state?.user?.current.accessToken);
  return authen ? <Outlet /> : <Navigate to="/shop/login" />;
};

export default PrivateRoutes;
