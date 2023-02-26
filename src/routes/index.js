import { Routes, Route } from "react-router-dom";
import { ListPosts } from "../pages/ListPosts";
import { CreatePost } from "../pages/CreatePost";
import { EditPost } from "../pages/EditPost";
import { Welcome } from "../pages/Welcome";
import { Post } from "../pages/Post";
import { NotFound } from "../pages/NotFound";
import { AdminLayout } from "../components/templates/AdminLayout";
import { GlobalLayout } from "../components/templates/GlobalLayout";
import { HomepageLayout } from "../components/templates/HomepageLayout";
import { Login } from "../pages/Login";

export const Routers = () => {
  return (
    <div className="container">
      <Routes>
        
        <Route path="/" element={<HomepageLayout />}>
          <Route index element={<Welcome />} />
        </Route>

        <Route path="/login" element={<HomepageLayout />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/posts" element={<GlobalLayout/>}>
          <Route index element={<ListPosts />} />
        </Route>

        <Route path="/posts" element={<GlobalLayout/>}>
          <Route path=":id" element={<ListPosts />} />
        </Route>

        <Route path="/post" element={<GlobalLayout/>}>
          <Route path=":id" element={<Post/>} />
        </Route>

        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="create" element={<CreatePost />}/>
          <Route path="edit" element={<EditPost />}>
            <Route path=":id" element={<EditPost />}/>
          </Route>
        </Route>

        <Route path="*" element={<NotFound/>}/>

      </Routes> 
    </div>
  );
}
