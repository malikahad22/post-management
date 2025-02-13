import { useState } from "react";
import axiosInstance from "../../api";
import handleApiResponse from "../../utils/handleApiResponse";

const useApi = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const request = async (url, method = "GET", body = {}, options = {}) => {
      setLoading(true);
      setError(null);

      try {
         const response = await axiosInstance({
            url,
            method,
            data: body,
            ...options,
         });

         const { data } = response;

         const statusCode = data?.statusCode;
         const message = data?.message;

         if (statusCode && message) {
            handleApiResponse(statusCode, message);
         }
         setData(response.data);
         return response;
      } catch (err) {
         setError(err?.response?.data || "Something went wrong");
         const error = err?.response?.data;
         handleApiResponse(error.statusCode, error.message);
      } finally {
         setLoading(false);
      }
   };

   return { data, loading, error, request };
};

export default useApi;
