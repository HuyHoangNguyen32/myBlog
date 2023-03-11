import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Pagination } from "../components/Pagination";

export default function ListPosts() {
  // State
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const navigate = useNavigate();

  // API
  const postsApi = "https://myblog-backend.click/api/posts";
  const searchPostApi = `https://myblog-backend.click/api/posts/search/${keyword}`;

  /**
   * ! Cập nhật tiêu đề trang
   */
  useEffect(() => {
    document.title = "Danh sách bài viết";
  });

  /**
   * ! Tìm kiếm bài viết theo tiêu đề
   */
  const handelSearch = () => {
    if (keyword) {
      const fetchPosts = async () => {
        const res = await axios.get(searchPostApi);
        setPosts(res.data);
      };
      fetchPosts();
    }
  };

  /**
   * ! Hiển thị danh sách bài viết
   */
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(postsApi);
      setPosts(res.data.reverse());
    };
    fetchPosts();
  }, []);

  /**
   * ! Chức năng phân trang mỗi trang 8 bài viết
   */
  // Lấy thông tin trang người dùng đang chọn
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/posts/${pageNumber}`);
  };
  // Lấy số bài viết trên trang hiện tại
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="container">
        <div className="row m-2">
          {/* Tìm kiếm */}
          <div className="input-group input-group-sm mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập từ khoá cho tiêu đề bài viết"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="input-group-prepend">
              <SSearch
                className="input-group-text"
                id="inputGroup-sizing-sm"
                onClick={handelSearch}
              >
                Tìm kiếm
              </SSearch>
            </div>
          </div>

          {/* Danh sách bài viết */}
          {currentPosts.map((post) => (
            <div key={post.id} className="col-sm-6 col-md-3 my-2">
              <div
                className="card shadow-sm w-100 h-100"
                style={{ minHeight: 225 }}
              >
                <SThumbnail
                  className="card-img-top"
                  src={`https://myblog-backend.click/uploads/images/${post.thumbnail}`}
                  alt="Posts Thumbnail"
                />
                <div className="card-body">
                  <STitle className="text-capitalize">{post.title}</STitle>
                  <SAuthorDate>
                    <p className="author">{post.author}</p>
                    <p className="date">{post.date}</p>
                  </SAuthorDate>
                  <SDescription>
                    {post.description.length >= 80
                      ? `${post.description.slice(0, 80)} ...`
                      : post.description}
                  </SDescription>
                  <SButton className="btn btn-sm btn-primary">
                    <NavLink
                      style={{ color: "#fff", textDecoration: "none" }}
                      to={`/post/${post.id}`}
                    >
                      Đọc bài viết
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

const SThumbnail = styled.img`
  max-height: 150px;
  overflow: hidden;
`;

const STitle = styled.h5`
  font-size: 20px;
  font-weight: bold;
`;

const SAuthorDate = styled.div`
  font-size: 14px;
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
  font-size: 14px;
`;

const SButton = styled.button`
  font-size: 14px;
`;

const SSearch = styled.span`
  :hover {
    cursor: pointer;
  }
`;
