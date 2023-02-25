import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Pagination } from "../components/Pagination";
import thumbnail from "../assets/img/thumbnail.jpeg";

export function ListPosts() {
  // Hiển thị danh sách bài viết
  const [posts, setPosts] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  // Tuỳ chỉnh link sử dụng useNavigate
  const navigate = useNavigate();

  const postsApi = "http://127.0.0.1:8000/api/books";

  /**
   * ! Show Posts
   */
  useEffect(() => {
    fetch(postsApi)
      .then((response) => response.json())
      .then((posts) => setPosts(posts));
  }, []);

  // Cập nhật title
  useEffect(() => {
    document.title = "List Posts Page";
  });

  /**
   * ! Pagination
   */
  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/posts/${pageNumber}`);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="container">
        <div className="row m-2">
          
          <SForm class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          </SForm>

          {currentPosts.map((post) => (
            <div key={post.id} className="col-sm-6 col-md-3 my-2">
              <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                <img className="card-img-top" src={thumbnail} alt="Posts Thumbnail" />
                <div className="card-body">
                  <STitle className="text-capitalize">{post.title}</STitle>
                  <SAuthorDate>
                    <p className="author">{post.author}</p>
                    <p className="date">2023/02/25</p>
                  </SAuthorDate>
                  <SDescription>
                    {post.publisher.length >= 80
                      ? `${post.publisher.slice(0, 80)} ...`
                      : post.publisher}
                  </SDescription>
                  <SButton className="btn btn-sm btn-primary">
                    <NavLink
                      style={{ color: "#fff", textDecoration: "none" }}
                      to={`/post/${post.id}`}
                    >
                      Read More
                    </NavLink>
                  </SButton>
                </div>
              </div>
            </div>
          ))}

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}

const SForm = styled.form`
  margin-top: 5px;
  margin-bottom: 20px;
`

const STitle = styled.h5`
  font-size: 15px;
  font-weight: bold;
  &:hover {
    color: #2980b9;
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
  }
`;

const SAuthorDate = styled.div`
  font-size: 10px;
  color: #fff;
  display: flex;
  p {
    border-radius: 5px;
    padding: 1px 5px;
    margin-bottom: 5px;
  }
  .date {
    margin-left: 10px;
    background-color: #7f8c8d;
  }
  .author {
    background-color: #7f8c8d;
  }
`;

const SDescription = styled.p`
  font-size: 12px;
`;

const SButton = styled.button`
  font-size: 10px;
`;
