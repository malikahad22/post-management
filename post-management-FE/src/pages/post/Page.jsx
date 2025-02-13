import useApi from "../../hooks/useApi";
import { postsRoute } from "../../routes/api-routes";
import Loading from '../../components/loader/Page';
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

import CreatePostModal from "../../components/create-post-modal/Page";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../constant/constant";
import { useNavigate } from "react-router-dom";
import { postDetailRoute } from "../../routes/app-routes";
import useDebounce from "../../hooks/useApi/useDebounce";
const Page = () => {

   const { loading, request } = useApi();
   const [posts, setPosts] = useState([]);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [total, setTotal] = useState(null);

   const user = useSelector((state) => state.user);
   const debouncedSearch = useDebounce(searchQuery, 1000); // Apply debouncing


   const navigate = useNavigate();

   // Pagination Logic
   const postsPerPage = 5;
   const totalPages = Math.ceil(total / postsPerPage);

   // Fetch posts on mount
   useEffect(() => {
      fetchPosts();
   }, [debouncedSearch]);


   // Fetch all posts
   const fetchPosts = async () => {

      const offset = (currentPage - 1) * postsPerPage;
      const param = {
         limit: postsPerPage,
         offset
      }

      if (debouncedSearch.trim()) param['title'] = debouncedSearch; // if user search for post then add title query
      const response = await request(postsRoute, 'GET', null, { params: param });

      if (response) {
         const { data } = response;
         setPosts(data.data.posts);
         setTotal(data.data.total);
      } else {
         setPosts([]);
      }

   };


   // Delete post function
   const deletePost = async (id) => {
      await request(`${postsRoute}/${id}`, 'DELETE');
      fetchPosts();
   };

   const openPostCreateModal = () => {
      setIsModalOpen(!isModalOpen);
   }


   const createPost = async (payload) => {

      const { userInfo } = user;

      const formData = new FormData();
      formData.append('title', payload.title);
      formData.append('content', payload.content);
      if (payload.thumbnail) {
         formData.append('thumbnail', payload.thumbnail); // Append the image file
      }

      const headers = {
         'Content-Type': 'multipart/form-data',
      }

      await request(postsRoute, 'POST', { ...payload, author: userInfo._id }, { headers });
      fetchPosts();
   };

   const redirectToPostPage = (id) => {
      navigate(`${postDetailRoute}?id=${id}`);
   }


   return (
      <div className="px-[10px] lg:px-[100px] py-8">
         <div className="flex flex-col md:flex-row justify-between w-full ">
            <h2 className="text-2xl font-semibold mb-6">Posts</h2>
            <div className="flex gap-5 items-center justify-center">
               <input
                  type="text"
                  name="search"
                  className="input input-bordered w-full"
                  placeholder="Search Post By Title..."
                  onChange={(e) => setSearchQuery(e.target.value)}

               />
               <button className="btn btn-primary" onClick={openPostCreateModal} >Create Post</button>
            </div>

         </div>

         {loading ? <Loading /> : (
            <div>
               {/* Grid Layout for Posts */}
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10">
                  {posts.length > 0 ? (
                     posts.map((post) => (
                        <div
                           key={post._id}
                           className="relative bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-110 hover:bg-sky-700 cursor-pointer"
                        >
                           {/* Delete Button */}
                           <button
                              onClick={() => deletePost(post._id)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full cursor-pointer z-10"
                           >
                              <FaTrash />
                           </button>

                           {/* Thumbnail */}
                           <div
                              onClick={() => redirectToPostPage(post._id)}
                              className="h-40 rounded-md"
                           >
                              <img
                                 src={`${BASE_URL}${post.thumbnail}`}
                                 alt="Post Thumbnail"
                                 className="w-full h-full object-cover"
                              />
                           </div>

                           <div className="flex flex-col flex-1  mt-3 ">
                              <h3 className="text-lg font-bold w-full text-ellipsis line-clamp-1">
                                 {post.title}
                              </h3>

                              <p className="text-gray-600 w-full text-ellipsis line-clamp-2 mt-3">
                                 {post.content}
                              </p>
                           </div>
                        </div>

                     ))
                  ) : (
                     <p className="text-center col-span-full text-gray-500">No posts found.</p>
                  )}
               </div>

               {/* Pagination Controls */}

               {posts.length > 0 &&
                  <div className="flex justify-center items-center mt-6 gap-4">
                     <button
                        className="btn btn-primary btn-sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                     >
                        Prev
                     </button>

                     <span className="text-sm">
                        Page {currentPage} of {totalPages}
                     </span>

                     <button
                        className="btn btn-primary btn-sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                     >
                        Next
                     </button>
                  </div>}


               {
                  isModalOpen && (<CreatePostModal isOpen={isModalOpen} onClose={openPostCreateModal} onSubmit={createPost} />)
               }
            </div>
         )}
      </div>
   );
};

export default Page;
