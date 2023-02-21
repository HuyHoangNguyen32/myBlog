import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "./components/Pagination";

function EditPost() {
  document.title = "Edit Post Page";

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState();

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)
  const navigate = useNavigate();

  const postsApi = "http://127.0.0.1:8000/api/books";
  const putPostApi = "http://127.0.0.1:8000/api/book";

  useEffect(() => {
    fetch(postsApi)
      .then((response) => response.json())
      .then((posts) => setPosts(posts));
  }, [update]);

  // Delete Post
  const deletePost = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá bài viết đã chọn không ?") === true) {
      var options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(putPostApi + "/" + id, options)
        .then((response) => response.json())
        .then(console.log("OK"));

        alert('Bài viết của bạn đã được xoá.')
        setUpdate(Math.random())
    }else {
      alert('Bạn đã huỷ việc xoá bài viết thành công.')
    }
  };

  // Get Post Data from API to Edit
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
    setShow(true);
  };

  // Send Edited Post Data
  const editPost = (id) => {
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
    fetch(putPostApi + "/" + id, options)
      .then((response) => response.json())
      .then(alert('Bài viết của bạn đã được cập nhật thành công.'))
      .then(setShow(false));

    setTitle("");
    setAuthor("");
    setPublisher("");
    setUpdate(Math.random())
  };

   // Change page
   const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    navigate(`/admin/edit/${pageNumber}`);
  }

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage //10
  const indexOfFirstPost = indexOfLastPost - postsPerPage // 0
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)


  return (
    <div style={{marginTop: 25}}>
      <h2>Edit Posts</h2>

      {show && (
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
                    className="btn btn-success"
                    onClick={() => setShow(false)}
                  >
                    Cancel
                  </button>
          <br />
          <br />
        </div>
      )}

      <table className="table table-hover">
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
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.publisher}</td>
              <td>
                <button
                  style={{ marginRight: 10 }}
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
                
                <button
                  style={{ marginRight: 10 }}
                  type="button"
                  className="btn btn btn-warning"
                  onClick={() => getPost(post.id)}
                >
                  Edit
                </button>
                {show && (
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => editPost(post.id)}
                  >
                    Submit Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}
     />
    </div>
  );
}

export default EditPost;
