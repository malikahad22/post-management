// ------------------------ libraries imports ------------------------
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// ------------------------ app imports ------------------------
import { loginRoute } from '../routes/app-routes';

const ProtectedRoutes = () => {
   const loggedInUser = useSelector((state) => state.user);
   return loggedInUser.isloggedIn ? <Outlet /> : <Navigate to={loginRoute} replace />
}

export default ProtectedRoutes;