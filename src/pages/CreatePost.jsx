import { useState, useRef } from "react";

function CreatePost() {
  document.title = "Create Post Page";

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");

  const titleRef = useRef();

  const putPostApi = "http://127.0.0.1:8000/api/book";


  const putPost = () => {
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        publisher,
      }),
    };

    fetch(putPostApi, options)
      .then((response) => response.json())
      .then(alert('Post success'))

    setTitle("");
    setAuthor("");
    setPublisher("");

    titleRef.current.focus();
  };

  return (
    <div style={{paddingTop: 80, paddingBottom: 80}}>
      <h2>Create Posts</h2>
      <div className="mt-3">
        <form>
          <div className="form-group">
            <label>Post Title</label>
            <input
              className="form-control"
              type="text"
              value={title}
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
              ref={titleRef}
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
          <br />
          <button type="button" className="btn btn-primary" onClick={putPost}>
            Publish
          </button>
        </form>
        <br />
        <div>
          <h3>
            {title || "Title"} - {author || "Author"} -{" "}
            {publisher || "Publisher"}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
