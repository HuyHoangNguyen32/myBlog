import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../components/Pagination";

export function EditPost() {
  // Hiển thị danh sách bài viết
  const [posts, setPosts] = useState([]);

  // Cập nhật thông tin bài viết
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");

  // Ẩn hiện Editor và danh sách bài viết
  const [showEditor, setShowEditor] = useState(false);
  const [showListPost, setShowListPost] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Lấy ID bài viết người dùng muốn chỉnh sửa
  const [postId, setPostId] = useState(null);

  // Tuỳ chỉnh link sử dụng useNavigate
  const navigate = useNavigate();

  // Gọi API
  const postsApi = "http://127.0.0.1:8000/api/books";
  const putPostApi = "http://127.0.0.1:8000/api/book";

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

    console.log("test api")

  }, [update]);

  // Cập nhật title
  useEffect(() => {
    document.title = "Edit Post Page";
  });

  /**
   * ! Delete Post
   */
  const deletePost = (id) => {

    if (
      window.confirm("Bạn có chắc chắn muốn xoá bài viết đã chọn không ?")
    ) {
      var options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(putPostApi + "/" + id, options).then((response) => response.json());

      setShowAlertDeleteSuccess(true)
      setUpdate(!update)
    } else {
      setShowAlertDeleteCancel(true)
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
          setPublisher(post.publisher)
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
        publisher,
      }),
    };
    fetch(putPostApi + "/" + postId, options)
    .then((response) => response.json())

    setShowEditor(false)

    setUpdate(!update)
    setShowListPost(true)

    setShowAlertEditSuccess(true)
    
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
      <h2>Edit Posts</h2>

      {/* Hiển thị Editor để chỉnh sửa bài viết */}
      {showEditor && (
        <div>
          <form>
            <div className="form-group">
              <label>Post Title</label>
              <input
                className="form-control"
                type="text"
                value={title}
                placeholder="Enter title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label>Post Author</label>
              <input
                className="form-control"
                type="text"
                value={author}
                placeholder="Enter author"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label>Post Description</label>
              <textarea
              style={{height: "200px"}}
                className="form-control"
                type="text"
                value={publisher}
                placeholder="Enter publisher"
                onChange={(e) => setPublisher(e.target.value)}
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
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={submitEditPost}
          >
            Submit
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
        <table className="table table-hover mt-3">
          <thead>
            <tr className="table-primary">
              <th scope="col">No</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Description</th>
              <th scope="col">Button</th>
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
                  {post.publisher.length > 90
                    ? `${post.publisher.slice(0, 90)} ...`
                    : post.publisher}
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
