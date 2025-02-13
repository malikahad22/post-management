
// ------------------------ libraries imports ------------------------
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// ------------------------ app imports ------------------------
import { postsRoute } from "../../routes/api-routes";
import { BASE_URL } from "../../constant/constant";
import Loading from '../../components/loader/Page';
import useApi from "../../hooks/useApi";


const PostDetails = () => {

   const { loading, request } = useApi();
   const [searchParams] = useSearchParams();
   const id = searchParams.get('id');

   const [post, setPost] = useState(null);


   useEffect(() => {

      const fetchPost = async () => {
         const response = await request(`${postsRoute}/${id}`)
         if (response) {
            const { data } = response;
            setPost(data.data);
         } else {
            setPost({});
         }
      };
      fetchPost();

   }, [id]);

   return (

      <>
         {
            loading || !post ? <Loading /> :
               <div className="p-6 overflow-hidden">
                  <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold  my-12">{post?.title}</h1>
                  {post.thumbnail && (
                     <img
                        src={`${BASE_URL}${post?.thumbnail}`}
                        alt={post?.title}
                        className="w-full object-cover h-[500px] rounded-lg shadow-md mb-4"
                     />
                  )}
                  <p className="text-lg text-gray-700 leading-relaxed mt-10 inline-bloc">{post?.content}</p>
               </div>
         }
      </>

   );
};

export default PostDetails;
