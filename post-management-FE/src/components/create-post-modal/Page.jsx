import PropTypes from "prop-types";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
   const [preview, setPreview] = useState(null);

   // Form validation schema
   const validationSchema = Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
      thumbnail: Yup.mixed().required("Thumbnail is required"),
   });

   // Formik form handler
   const formik = useFormik({
      initialValues: {
         title: "",
         content: "",
         author: "",
         thumbnail: null,
      },
      validationSchema,
      onSubmit: (values) => {
         onSubmit(values);
         onClose();
      },
   });

   // File upload handler
   const handleFileChange = (event) => {
      const file = event.target.files[0];

      if (file) {
         const validTypes = ["image/png", "image/jpeg", "image/jpg"];

         if (!validTypes.includes(file.type)) {
            toast.error('Invalid file type');
            return;
         }

         formik.setFieldValue("thumbnail", file);
         const reader = new FileReader();
         reader.onloadend = () => setPreview(reader.result);
         reader.readAsDataURL(file);
      }
   };
   return (
      <div className={`fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 ${isOpen ? "block" : "hidden"} px-5`}>
         <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">Create Post</h2>
               <button className="text-gray-500 hover:text-red-500 cursor-pointer" onClick={onClose}>
                  <FaTimes />
               </button>
            </div>

            {/* Form */}
            <form onSubmit={formik.handleSubmit}>
               {/* Title */}
               <div className="mb-3">
                  <label className="block font-medium mb-1">Title</label>
                  <input
                     type="text"
                     name="title"
                     className="input input-bordered w-full"
                     onChange={formik.handleChange}
                     value={formik.values.title}
                  />
                  {formik.errors.title && <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>}
               </div>

               {/* Content */}
               <div className="mb-3">
                  <label className="block font-medium mb-1">Content</label>
                  <textarea
                     name="content"
                     className="textarea textarea-bordered w-full"
                     rows="3"
                     onChange={formik.handleChange}
                     value={formik.values.content}
                  ></textarea>
                  {formik.errors.content && <p className="text-red-500 text-sm mt-1">{formik.errors.content}</p>}
               </div>

               {/* Thumbnail Upload */}
               <div className="mb-3">
                  <label className="block font-medium mb-1">Thumbnail</label>
                  <input type="file" className="file-input file-input-bordered w-full" onChange={handleFileChange} />
                  {formik.errors.thumbnail && <p className="text-red-500 text-sm mt-1">{formik.errors.thumbnail}</p>}
                  {preview && (
                     <div className="mt-3">
                        <img src={preview} alt="Preview" className="w-full h-32 object-cover rounded-lg shadow" />
                     </div>
                  )}
               </div>

               <button type="submit" disabled={!formik.dirty || !formik.isValid} className="btn btn-primary w-full mt-4">Create Post</button>
            </form>
         </div>
      </div>
   );
};

CreatePostModal.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   onSubmit: PropTypes.func.isRequired,
};


export default CreatePostModal;
