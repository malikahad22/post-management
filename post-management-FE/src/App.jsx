// ------------------------ app imports ------------------------
import { homeRoute, postDetailRoute, userDetailRoute } from './routes/app-routes';
import ProtectedRoute from './protectedRoute/index';
import Login from './pages/login/Page';
import Home from './pages/home/Page';
import PostDetails from './pages/post-details/Page';
import UserDetais from './pages/user-details/Page';


// ------------------------ libraries imports ------------------------
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<ProtectedRoute />} >
          <Route path={homeRoute} element={<Home />} />
          <Route path={postDetailRoute} element={<PostDetails />} />
          <Route path={postDetailRoute} element={<PostDetails />} />
          <Route path={userDetailRoute} element={<UserDetais />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
