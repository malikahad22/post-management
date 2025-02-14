// ------------------------ libraries imports ------------------------
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


// ------------------------ app imports ------------------------
import { userWithPostRoute } from "../../routes/api-routes";
import PostListTable from "../../components/post-table/Page";
import Loading from "../../components/loader/Page";
import User from '../../assets/Avatar.png';
import useApi from "../../hooks/useApi";


const Page = () => {

   const { request } = useApi();
   const [searchParams] = useSearchParams();
   const id = searchParams.get('id');

   const [user, setUser] = useState(null);

   useEffect(() => {
      getUserWithPosts();
   }, []);


   const getUserWithPosts = async () => {
      const response = await request(`${userWithPostRoute}/${id}`, 'GET');
      const { data } = response;
      setUser(data?.data[0]);
   }

   return (
      <>
         {
            !user ? <Loading /> :
               (
                  <div className="max-w-4xl mx-auto p-6">

                     {/* User Details Section */}
                     <div className="flex my-10 justify-between">
                        <h1 className="text-3xl font-semibold ">User Details</h1>
                        <button onClick={() => window.history.back()} className="btn">Back</button>
                     </div>
                     <div className="flex items-center max-w-[900px] rounded-lg h-[200px] md:h-[300px] bg-slate-100 py-10 px-6 gap-10">
                        <div className="hidden lg:flex items-center h-full">
                           <img className="h-66" src={User} alt="" />
                        </div>
                        <div className="py-10 space-y-2">
                           <p className="text-xl md:text-2xl  font-bold"><span>Name:  </span>{user?.name || ''}</p>
                           <p className="text-xl md:text-2xl  font-bold">Email: {user?.email || ''}</p>
                           <p className="text-xl md:text-2xl font-bold">Role: {user?.role || ''}</p>
                        </div>
                     </div>

                     {/* Posts Section */}
                     {user?.posts?.length ? (
                        <div>
                           <h2 className="text-3xl font-semibold my-10">Posts</h2>
                           <PostListTable posts={user?.posts || []} />
                        </div>
                     ) : (
                        <div className="text-center mt-8 text-xl text-gray-600">No posts available for this user.</div>
                     )}

                  </div>
               )
         }
      </>
   );
}

export default Page