import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import axios from "axios";

export function EditPost() {
  // Hiển thị danh sách bài viết
  const [posts, setPosts] = useState([]);

  // Cập nhật thông tin bài viết
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // Ẩn hiện Editor và danh sách bài viết
  const [showEditor, setShowEditor] = useState(false);
  const [showListPost, setShowListPost] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Lấy ID bài viết người dùng muốn chỉnh sửa
  const [postId, setPostId] = useState(null);

  // Keyword
  const [keyword, setKeyword] = useState("");

  // Tuỳ chỉnh link sử dụng useNavigate
  const navigate = useNavigate();

  // Gọi API
  const postsApi = "http://127.0.0.1:8000/api/posts";
  const putPostApi = "http://127.0.0.1:8000/api/posts";

  const [update, setUpdate] = useState(false);

  const [showAlertDeleteSuccess, setShowAlertDeleteSuccess] = useState(false);
  const [showAlertDeleteCancel, setShowAlertDeleteCancel] = useState(false);
  const [showAlertEditSuccess, setShowAlertEditSuccess] = useState(false);

  /**
   * ! Show Posts
   */
  useEffect(() => {
    fetch(postsApi)
      .then((response) => response.json())
      .then((posts) => setPosts(posts.reverse()));
  }, [update]);

  // Cập nhật title
  useEffect(() => {
    document.title = "Edit Post Page";
  });

  /**
   * ! Delete Post
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
      setUpdate(!update);
    } else {
      setShowAlertDeleteCancel(true);
    }
  };

  /**
   * ! Edit Post
   */
  // Logic diễn ra khi nhấn nút Edit
  function handleClickEditPost(postID) {
    getEditPost(postID);
    setPostId(postID);
    setShowEditor(true);
    setShowListPost(false);
  }

  // Hiển thị thông tin bài viết người dùng muốn chỉnh sửa vào editor
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

  // Cập nhật bài post khi người dùng nhấn nút Submit
  const submitEditPost = () => {
    var options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        description,
      }),
    };
    fetch(putPostApi + "/" + postId, options).then((response) =>
      response.json()
    );

    setShowEditor(false);

    setUpdate(!update);
    setShowListPost(true);

    setShowAlertEditSuccess(true);
  };

  // Search
  const searchPostApi = `http://127.0.0.1:8000/api/posts/search/${keyword}`;
  const handelSearch = () => {
    const fetchPosts = async () => {
      const res = await axios.get(searchPostApi);
      setPosts(res.data);
    };
    fetchPosts();
    // navigate(`/posts/admin/search/${keyword}`);
  };

  /**
   * ! Pagination
   */
  // Tuỳ chỉnh sao cho link thay đổi tương ứng khi người dùng thay đổi trang
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/admin/edit/${pageNumber}`);
  };
  // Lấy ra danh sách bài viết hiện tại
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div style={{ marginTop: 80, paddingBottom: 80 }}>
      <h2 style={{marginBottom: "25px"}}>Xoá hoặc sửa bài viết</h2>

      {/* Hiển thị Editor để chỉnh sửa bài viết */}
      {showEditor && (
        <div>
          <form>
            <div className="form-group">
              <label><b>Tiêu đề</b></label>
              <input
                className="form-control"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label><b>Tác giả</b></label>
              <input
                className="form-control"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label><b>Ngày tháng đăng</b></label>
              <input
                className="form-control"
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label><b>Đoạn trích dẫn</b></label>
              <textarea
                style={{ height: "200px" }}
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

      {/* <!-- Alert Delete Success --> */}
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
      {/* <!-- Alert Delete Cancel --> */}
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

      {/* <!-- Alert Edit Success --> */}
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
              <span
                className="input-group-text"
                id="inputGroup-sizing-sm"
                onClick={handelSearch}
              >
                Tìm kiếm
              </span>
            </div>
          </div>

          <table className="table table-hover mt-3">
            <thead>
              <tr className="table-primary">
                <th scope="col">No</th>
                <th scope="col">Tiêu đề</th>
                <th scope="col">Tác giả</th>
                <th scope="col">Trích dẫn</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>

            <tbody>
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
                    {/* <!-- Button trigger modal --> */}
                    <button
                      type="button"
                      style={{ margin: 5 }}
                      className="btn btn-sm btn-danger"
                      onClick={() => deletePost(post.id)}
                    >
                      Delete
                    </button>

                    <button
                      style={{ margin: 5 }}
                      type="button"
                      className="btn btn-sm btn-warning"
                      onClick={() => {
                        handleClickEditPost(post.id);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Hiển thị pagination */}
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
