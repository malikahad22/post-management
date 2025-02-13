// ------------------------ libraries imports ------------------------
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

// ------------------------ app imports ------------------------
import CreateUserModal from '../../components/create-user-modal/Page';
import { userDetailRoute } from "../../routes/app-routes/index";
import { userRoute } from "../../routes/api-routes";
import Loading from "../../components/loader/Page";
import useApi from "../../hooks/useApi";


const Page = () => {
   const { loading, request } = useApi();
   const [users, setUsers] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalUsers, setTotalUsers] = useState(null);

   const navigate = useNavigate();



   const usersPerPage = 5;
   const totalPages = Math.ceil(totalUsers / usersPerPage);

   const user = useSelector(state => state.user);
   const { userInfo } = user;

   const isSuperAdmin = userInfo.role === 'superadmin';

   useEffect(() => {
      fetchUsers();
   }, [currentPage]);

   const createUser = async (data) => {
      await request(userRoute, 'POST', data);
      fetchUsers();
   }

   const fetchUsers = async () => {
      const offset = (currentPage - 1) * usersPerPage;

      const param = {
         limit: usersPerPage,
         offset,
         user: userInfo._id // don't request for loggedin user
      }
      const response = await request(userRoute, "GET", null, {
         params: param
      });

      const { data } = response;
      setUsers(data.data.users);
      setTotalUsers(data.data.total - 1);
   };


   const deleteUser = async (id) => {
      await request(`${userRoute}/${id}`, "DELETE");
      fetchUsers();
   };

   return (
      <div className="md:px-[100px] flex flex-col max-h-[500px] items-center justify-center">
         {loading ? <Loading /> : (
            <div className="container mx-auto p-6">
               <div className="flex w-full justify-between">
                  <h2 className="text-2xl font-bold mb-4">Users</h2>
                  <button onClick={() => setIsOpen(true)} className="btn btn-primary">Create User</button>
               </div>

               {
                  users.length > 0 ? (
                     <>
                        <div className="overflow-x-auto mt-10">
                           <table className="table w-[500px] md:w-full border text-center border-gray-300">
                              <thead>
                                 <tr className="bg-base-200">
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Email</th>
                                    <th className="p-2">Role</th>
                                    <th className="p-2">Action</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {users.map((user) => (

                                    <tr key={user._id} className="hover">
                                       <td className="p-2">{user.name}</td>
                                       <td className="p-2">{user.email}</td>
                                       <td className="p-2">{user.role}</td>
                                       <td className="p-2">
                                          <button
                                             disabled={!isSuperAdmin}
                                             onClick={() => deleteUser(user._id)}
                                             className="btn btn-error btn-sm text-white">
                                             <MdDelete size={20} />
                                          </button>
                                          <button
                                             onClick={() => navigate(`${userDetailRoute}?id=${user._id}`)}
                                             className="btn btn-accent btn-sm ml-2 text-gray-600">
                                             <FaEye size={20} />
                                          </button>
                                       </td>
                                    </tr>

                                 ))}
                              </tbody>
                           </table>
                        </div>

                        {
                           users.length > 0 &&
                           <div className="flex justify-center w-full mt-10">
                              <button
                                 className="btn btn-secondary mx-2"
                                 disabled={currentPage === 1}
                                 onClick={() => setCurrentPage(prev => prev - 1)}>
                                 Previous
                              </button>
                              <span className="p-2 text-sm md:text-lg">Page {currentPage} of {totalPages}</span>
                              <button
                                 className="btn btn-secondary mx-2"
                                 disabled={currentPage === totalPages}
                                 onClick={() => setCurrentPage(prev => prev + 1)}>
                                 Next
                              </button>
                           </div>
                        }

                        {
                           isOpen && <CreateUserModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={createUser} />
                        }
                     </>
                  ) : <p className="text-center">No User Found</p>
               }

            </div>
         )}
      </div>
   );
};

export default Page;
