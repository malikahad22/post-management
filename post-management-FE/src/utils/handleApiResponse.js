import { toast } from "react-toastify";
import { logout } from "../redux/slices/authSlice";
import { store } from "../redux/store/store";

const handleApiResponse = (status, message) => {
   switch (status) {
      case 200:
         break;

      case 201:
         toast.success(message || "Resource Created Successfully");
         break;

      case 400:
         toast.error(message || "Bad request. Please check your input.");
         break;

      case 401:
         toast.error(message || "Unauthorized! Please log in again.");
         store.dispatch(logout());
         break;

      case 403:
         toast.error(message || "Access denied! You don't have permission.");
         break;

      case 404:
         break;

      case 500:
         toast.error(message || "Server error! Please try again later.");
         break;
      default:
         toast.error("Something went wrong!");
         break;
   }

   return null;
};

export default handleApiResponse;
