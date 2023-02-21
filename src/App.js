import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import ListPosts from "./ListPosts";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import Home from "./Home";
import Post from "./Post";
import NotFound from "./NotFound";
import AdminLayout from "./components/templates/AdminLayout";
import GlobalLayout from "./components/templates/GlobalLayout";
import HomepageLayout from "./components/templates/HomepageLayout";

function App() {
  return (
    <div className="container">
      <Routes>
        
        <Route path="/" element={<HomepageLayout />}>
          <Route index element={<Home />}/>
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

export default App;
