import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import thumbnail from '../assets/img/thumbnail.jpeg'

function ListPosts() {

  document.title = "List Posts Page";

  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(8)
  const navigate = useNavigate();

  const postsApi = "http://127.0.0.1:8000/api/books";

  useEffect(() => {
    fetch(postsApi)
      .then((response) => response.json())
      .then((posts) => setPosts(posts));
  }, []);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    navigate(`/posts/${pageNumber}`);
  }

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage //10
  const indexOfFirstPost = indexOfLastPost - postsPerPage // 0
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <div style={{paddingTop: 80, paddingBottom: 80}}>
      <div className="container">
        <div className="row m-2">
          {currentPosts.map((post) => (
            <div className="col-sm-6 col-md-3 v my-2">
            <div className="card shadow-sm w-100" style={{ minHeight: 225 }} key={post.id}>
              <img className="card-img-top" src={thumbnail} alt=""/>
              <div className="card-body">
                <h5 className="card-title text-center h3">{post.title.length > 15 ? `${post.title.slice(0,25)} ...` : post.title} </h5>
                <p className="card-text">
                  {post.author} - {post.publisher.length > 20 ? `${post.publisher.slice(0,50)} ...` : post.publisher} 
                </p>
                <button className="btn btn-primary">
                  <NavLink style={{color: "#fff", textDecoration: "none"}} to={`/post/${post.id}`}>Read More</NavLink>
                </button>
              </div>
            </div>
            </div>
          ))}

          <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}
     />
        </div>
      </div>
    </div>
  );
}

export default ListPosts;
