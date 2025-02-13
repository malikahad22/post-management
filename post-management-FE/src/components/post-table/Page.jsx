import propTypes from "prop-types";
import { BASE_URL } from "../../constant/constant";

const Page = ({ posts }) => {
   return (
      <div className="overflow-x-auto">
         <table className="table w-full text-center">
            {/* head */}
            <thead>
               <tr className="text-center">
                  <th>Thumbnail</th>
                  <th>Title</th>
                  <th className="w-[500px]">Content</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {posts.map((post, index) => (
                  <tr className="w-full text-center" key={index}>

                     <td>
                        <div className="avatar">
                           <div className="mask mask-squircle h-12 w-12">
                              <img src={`${BASE_URL}${post.thumbnail}`} alt={post.title} />
                           </div>
                        </div>
                     </td>
                     <td className="font-bold text-ellipsis text-center">{post.title.slice(0, 10) + '...'}</td>
                     <td className="text-sm opacity-80 text-nowrap line-clamp-1 w-[500px]">{post.content.slice(0, 50) + '...'}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

Page.propTypes = {
   posts: propTypes.arrayOf(
      propTypes.shape({
         title: propTypes.string.isRequired,
         content: propTypes.string.isRequired,
         thumbnail: propTypes.string.isRequired,
      })
   ).isRequired,
};

export default Page;
