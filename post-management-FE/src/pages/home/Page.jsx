import { useSelector } from "react-redux";
import Header from '../../components/header/Page';
import Users from '../users/Page';
import Posts from '../post/Page';
const Page = () => {

   const user = useSelector((state) => state.user);
   const isUser = user.userInfo.role === 'user';

   return (
      <>
         <div>
            <Header />
         </div>

         {
            isUser ? <Posts /> : <Users />
         }
      </>
   )
}

export default Page