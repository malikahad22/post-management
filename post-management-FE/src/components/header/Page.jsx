import { Link, useNavigate } from "react-router-dom"
import { homeRoute, loginRoute } from "../../routes/app-routes";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Page = () => {

   const { userInfo } = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const logoutHandler = () => {
      dispatch(logout());
      navigate(loginRoute);
   }

   return (
      < div className="flex w-full h-20 items-center justify-between border-b-2 border-zinc-200 px-[20px] md:px-[60px] lg:px-[100px] shadow-lg" >
         <Link className="text-sm md:text-2xl font-bold text-primary" to={homeRoute}>Post Management</Link>
         <div className="flex gap-5 items-center">
            <div>
               <button onClick={logoutHandler} className="btn btn-accent text-white w-16 h-8 md:w-24 md:h-12">Logout</button>
            </div>
            <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-gray-400">
               <p className=" text-xl font-semibold text-white">{userInfo.name[0]}</p>
            </div>

         </div>
      </div >

   )
}

export default Page