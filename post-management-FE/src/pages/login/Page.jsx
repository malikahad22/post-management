// ------------------------ app imports ------------------------
import Button from '../../components/button/Page';
import LoginImage from '../../assets/login-image.png';
import useApi from '../../hooks/useApi';
import { LOGIN } from '../../routes/api-routes';
import { login } from '../../redux/slices/authSlice';
import { homeRoute } from '../../routes/app-routes';

// ------------------------ libraries imports ------------------------
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Page = () => {

   const { loading, request } = useApi();
   const dispatch = useDispatch();
   const user = useSelector((state) => state.user);
   const navigate = useNavigate();

   useEffect(() => {
      if (user.isloggedIn) {
         navigate(homeRoute);
      }
   }, []);

   const formik = useFormik({
      initialValues: {
         email: "",
         password: "",
      },
      validationSchema: Yup.object({
         email: Yup.string().email("Invalid email").required("Email is required"),
         password: Yup.string()
            .min(8, "Must be at least 8 characters")
            .matches(/[A-Z]/, "Must contain at least one uppercase letter")
            .matches(/[a-z]/, "Must contain at least one lowercase letter")
            .matches(/[0-9]/, "Must contain at least one number")
            .matches(/[@$!%*?&]/, "Must contain at least one special character")
            .required("Password is required"),
      }),

      onSubmit: async (values) => {

         const response = await request(LOGIN, "POST", values);
         const { data } = response;
         dispatch(login(data));
         navigate(homeRoute)

      },
   });

   return (
      <div className="flex items-center justify-center lg:gap-[200px] px-[10px] min-h-screen bg-gray-100">

         <div className='hidden lg:flex'>
            <img className='h-[440px] w-[440px]' src={LoginImage} alt="/" height={'640px'} width={'640px'} />
         </div>
         <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-[60%] lg:w-[40%] h-96 flex flex-col justify-center space-y-10 my-auto">
            <h2 className="text-2xl font-bold  text-Black mb-6">Post Management</h2>
            <form onSubmit={formik.handleSubmit}>
               <div className="form-control">
                  <label className="label">Email</label>
                  <input
                     type="email"
                     name="email"
                     className="input input-bordered w-full mt-1"
                     placeholder="example@gmail.com"
                     {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email ? (
                     <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                  ) : null}
               </div>
               <div className="form-control mt-4">
                  <label className="label">Password</label>
                  <input
                     type="text"
                     name="password"
                     className="input input-bordered w-full mt-1"
                     placeholder="********"
                     {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password ? (
                     <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                  ) : null}
               </div>

               <Button disabled={!formik.isValid || !formik.dirty} isLoading={loading} type="submit" classes="btn btn-primary w-full mt-4 hover:scale-110 duration-600" text="Login" />
            </form>

         </div>
      </div>
   );
};

export default Page;
