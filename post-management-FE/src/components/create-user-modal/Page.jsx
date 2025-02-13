import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import propTypes from "prop-types";
const Page = ({ isOpen, onClose, onSubmit }) => {

   const user = useSelector(state => state.user);

   const currentUserRole = user.userInfo.role;

   // Define role options based on current user role
   const roleOptions =
      currentUserRole === "superadmin"
         ? ["user", "admin"]
         : ["user"];

   // Form validation schema
   const validationSchema = Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
         .min(8, "Must be at least 8 characters")
         .matches(/[A-Z]/, "Must contain at least one uppercase letter")
         .matches(/[a-z]/, "Must contain at least one lowercase letter")
         .matches(/[0-9]/, "Must contain at least one number")
         .matches(/[@$!%*?&]/, "Must contain at least one special character")
         .required("Password is required"), role: Yup.string().required("Role is required"),
   });

   // Handle form submission
   const handleSubmit = async (values, { resetForm }) => {

      onSubmit(values);
      resetForm();
      onClose();
   };

   return (
      <div className="p-4">

         {/* Modal */}
         {isOpen && (
            <dialog open className="modal bg-black/50">
               <div className="modal-box">
                  <h3 className="font-bold text-lg">Create User</h3>

                  <Formik
                     initialValues={{ name: "", email: "", password: "", role: "" }}
                     validationSchema={validationSchema}
                     onSubmit={handleSubmit}
                  >
                     <Form className="space-y-4">
                        {/* Name */}
                        <div>
                           <label className="label">Name</label>
                           <Field type="text" name="name" className="input input-bordered w-full" />
                           <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Email */}
                        <div>
                           <label className="label">Email</label>
                           <Field type="email" name="email" className="input input-bordered w-full" />
                           <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Password */}
                        <div>
                           <label className="label">Password</label>
                           <Field type="password" name="password" className="input input-bordered w-full" />
                           <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Role */}
                        <div>
                           <label className="label">Role</label>
                           <Field as="select" name="role" className="select select-bordered w-full">
                              <option value="">Select Role</option>
                              {roleOptions.map((role) => (
                                 <option key={role} value={role}>
                                    {role}
                                 </option>
                              ))}
                           </Field>
                           <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Submit Button */}
                        <div className="modal-action">
                           <button type="submit" className="btn btn-primary">
                              Create
                           </button>
                           <button type="button" className="btn" onClick={onClose}>
                              Cancel
                           </button>
                        </div>
                     </Form>
                  </Formik>
               </div>
            </dialog>
         )}
      </div>
   );
};

Page.propTypes = {
   isOpen: propTypes.bool.isRequired,
   onClose: propTypes.func.isRequired,
   onSubmit: propTypes.func.isRequired,
}

export default Page;
