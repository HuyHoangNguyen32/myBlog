import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Pagination } from "../components/Pagination";

export default function EditPost() {
  // State
  const [posts, setPosts] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [showEditor, setShowEditor] = useState(false);
  const [showListPost, setShowListPost] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const [postId, setPostId] = useState(null); // Lấy ID bài viết user muốn chỉnh sửa

  const [keyword, setKeyword] = useState(""); // Lấy từ khoá tìm kiếm user nhập

  const [showAlertDeleteSuccess, setShowAlertDeleteSuccess] = useState(false);
  const [showAlertDeleteCancel, setShowAlertDeleteCancel] = useState(false);
  const [showAlertEditSuccess, setShowAlertEditSuccess] = useState(false);

  const navigate = useNavigate();

  // API
  const postsApi = "https://myblog-backend.click/api/posts";
  const putPostApi = "https://myblog-backend.click/api/posts";
  const searchPostApi = `https://myblog-backend.click/api/posts/search/${keyword}`;

  /**
   * ! Cập nhật tiêu đề trang
   */
  useEffect(() => {
    document.title = "Sửa xoá bài viết";
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
    fetch(postsApi)
      .then((response) => response.json())
      .then((posts) => setPosts(posts.reverse()));
  }, []);

  /**
   * ! Xoá bài viết khi user nhấn nút "Xoá"
   */
  const deletePost = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá bài viết đã chọn không ?")) {
      var options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(putPostApi + "/" + id, options).then((response) => response.json());

      setShowAlertDeleteSuccess(true);
    } else {
      setShowAlertDeleteCancel(true);
    }
  };

  /**
   * ! Logic diễn ra khi nhấn nút "Sửa"
   */
  function handleClickEditPost(postID) {
    getEditPost(postID);
    setPostId(postID);
    setShowEditor(true);
    setShowListPost(false);
  }

  /**
   * ! Hiển thị bài viết cần sửa ra editor
   */
  const getEditPost = (id) => {
    var options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(putPostApi + "/" + id, options)
      .then((response) => response.json())
      .then((post) => {
        return (
          setTitle(post.title),
          setAuthor(post.author),
          setDate(post.date),
          setDescription(post.description)
        );
      });
    setShowEditor(true);
  };

  /**
   * ! Cập nhật bài post khi người dùng nhấn nút "Cập nhật bài viết"
   */
  const submitEditPost = () => {
    // Dữ liệu gửi đi
    var options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        date,
        description,
      }),
    };

    // Gửi dũ liệu đi
    fetch(putPostApi + "/" + postId, options).then((response) =>
      response.json()
    );

    // Reset lại trạng thái ban đầu và hiển thị alert
    setShowEditor(false);
    setShowListPost(true);
    setShowAlertEditSuccess(true);
  };

  /**
   * ! Chức năng phân trang mỗi trang 10 bài viết
   */
  // Lấy thông tin trang người dùng đang chọn
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/admin/edit/${pageNumber}`);
  };
  // Lấy số bài viết trên trang hiện tại
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div style={{ marginTop: 80, paddingBottom: 80 }}>
      <h2 style={{ marginBottom: "25px" }}>Xoá hoặc sửa bài viết</h2>

      {/* Hiển thị Editor để chỉnh sửa bài viết */}
      {showEditor && (
        <div>
          <form>
            <div className="form-group">
              <label>Tiêu đề</label>
              <input
                className="form-control"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label>Tác giả</label>
              <input
                className="form-control"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label>Ngày tháng năm đăng bài</label>
              <input
                className="form-control"
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label>Đoạn trích dẫn</label>
              <textarea
                style={{ height: "100px" }}
                className="form-control"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </form>
          <br />
          <button
            type="button"
            className="btn btn-sm btn-success"
            style={{ marginRight: "5px" }}
            onClick={() => {
              setShowEditor(false);
              setShowListPost(true);
            }}
          >
            Huỷ bỏ
          </button>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={submitEditPost}
          >
            Cập nhật bài viết
          </button>
          <br />
          <br />
        </div>
      )}

      {/* Alert Delete Success */}
      {showAlertDeleteSuccess && (
        <div>
          <div
            className="mt-5 mb-5 alert alert-success alert-dismissible fade show"
            role="alert"
          >
            Bạn đã xoá bài viết thành công.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setShowAlertDeleteSuccess(false)}
            ></button>
          </div>
        </div>
      )}
      {/* Alert Delete Cancel */}
      {showAlertDeleteCancel && (
        <div>
          <div
            className="mt-5 mb-5 alert alert-primary alert-dismissible fade show"
            role="alert"
          >
            Bạn đã huỷ thao tác xoá bài viết thành công.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setShowAlertDeleteCancel(false)}
            ></button>
          </div>
        </div>
      )}

      {/* Alert Edit Success */}
      {showAlertEditSuccess && (
        <div>
          <div
            className="mt-5 mb-5 alert alert-success alert-dismissible fade show"
            role="alert"
          >
            Bạn đã chỉnh sửa bài viết thành công.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setShowAlertEditSuccess(false)}
            ></button>
          </div>
        </div>
      )}

      {/* Hiển thị danh sách 10 bài viết trên một trang */}
      {showListPost && (
        <div>
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

          <table className="table table-hover mt-3">
            <thead>
              <tr className="table-primary">
                <th scope="col">No</th>
                <th scope="col">Tiêu đề</th>
                <th scope="col">Tác giả</th>
                <th scope="col">Đoạn trích dẫn</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {/* Danh sách bài viết */}
              {currentPosts.map((post, index) => (
                <tr key={post.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {post.title.length > 20
                      ? `${post.title.slice(0, 30)} ...`
                      : post.title}
                  </td>
                  <td>{post.author}</td>
                  <td>
                    {post.description.length > 90
                      ? `${post.description.slice(0, 90)} ...`
                      : post.description}
                  </td>
                  <td>
                    {/* Delete Post */}
                    <button
                      type="button"
                      style={{ margin: 5 }}
                      className="btn btn-sm btn-danger"
                      onClick={() => deletePost(post.id)}
                    >
                      Xoá
                    </button>

                    {/* Edit Post */}
                    <button
                      style={{ margin: 5 }}
                      type="button"
                      className="btn btn-sm btn-warning"
                      onClick={() => {
                        handleClickEditPost(post.id);
                      }}
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showListPost && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      )}
    </div>
  );
}

const SSearch = styled.span`
  :hover {
    cursor: pointer;
  }
`;
