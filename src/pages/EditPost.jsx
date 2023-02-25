import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../components/Pagination";

function EditPost() {

  document.title = "Edit Post Page";

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
  const postsPerPage = 10

  // Lấy ID bài viết người dùng muốn chỉnh sửa
  const [postId, setPostId] = useState(null);

  // Tuỳ chỉnh link sử dụng useNavigate
  const navigate = useNavigate();
  
  // Gọi API
  const postsApi = "http://127.0.0.1:8000/api/books";
  const putPostApi = "http://127.0.0.1:8000/api/book";
  
  const [update, setUpdate] = useState();

  /**
   * ! Show Posts
   */
  useEffect(() => {
    fetch(postsApi)
      .then((response) => response.json())
      .then((posts) => setPosts(posts));
  }, [update]);

  /**
   * ! Delete Post
   */
  const deletePost = (id) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xoá bài viết đã chọn không ?") ===
      true
    ) {
      var options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(putPostApi + "/" + id, options)
        .then((response) => response.json())
        .then(console.log("OK"));

      alert("Bài viết của bạn đã được xoá.");
      setUpdate(Math.random());
    } else {
      alert("Bạn đã huỷ việc xoá bài viết thành công.");
    }
  };

  /**
   * ! Edit Post
   */
  // Logic diễn ra khi nhấn nút Edit
  function handleClickEditPost(postID) {
    getPost(postID);
    setPostId(postID);
    setShowEditor(true);
    setShowListPost(false);
  }

  // Hiển thị thông tin bài viết người dùng muốn chỉnh sửa vào editor
  const getPost = (id) => {
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
  const editPost = () => {
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
      .then(alert("Bài viết của bạn đã được cập nhật thành công."))
      .then(setShowEditor(false));

    setTitle("");
    setAuthor("");
    setPublisher("");
    setUpdate(Math.random());
    setShowListPost(true);
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
              <label>Post Publisher</label>
              <input
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
            onClick={editPost}
          >
            Submit
          </button>
          <br />
          <br />
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
                <td>{post.title.length > 20 ? `${post.title.slice(0,30)} ...` : post.title}</td>
                <td>{post.author}</td>
                <td>{post.publisher.length > 90 ? `${post.publisher.slice(0,90)} ...` : post.publisher}</td>
                <td>
                  <button
                    style={{ margin: 5 }}
                    type="button"
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

export default EditPost;
