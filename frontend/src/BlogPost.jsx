import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function BlogPost() {

  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    fetch(`https://pto-blog-backend.onrender.com/api/posts/${id}`)

      .then((response) => {

        if (!response.ok) {
          throw new Error("Post not found");
        }

        return response.json();

      })

      .then((data) => {

        setPost(data);
        setLoading(false);

      })

      .catch((error) => {

        console.error("Error loading post:", error);

        setError("Unable to load this blog post.");

        setLoading(false);

      });

  }, [id]);


  /* ================= LOADING ================= */

  if (loading) {

    return (
      <div className="post-page-message">
        Loading blog post...
      </div>
    );

  }


  /* ================= ERROR ================= */

  if (error || !post) {

    return (
      <div className="post-page-message">

        <p>
          {error || "Blog post not found."}
        </p>

        <Link to="/">
          ← Back to Blog
        </Link>

      </div>
    );

  }


  /* ================= BLOG POST ================= */

  return (

    <div className="single-post-page">

      {/* BACK TO BLOG */}

      <Link
        to="/#blog"
        className="back-to-blog"
      >
        ← Back to Blog
      </Link>


      {/* IMAGE */}

      <div className="single-post-image">

        <img
          src={post.image}
          alt={post.title}
        />

      </div>


      {/* CATEGORY */}

      <p className="single-post-category">
        {post.category}
      </p>


      {/* DATE */}

      <p className="single-post-date">
        {post.date}
      </p>


      {/* TITLE */}

      <h1 className="single-post-title">
        {post.title}
      </h1>


      {/* DESCRIPTION */}

      <p className="single-post-description">
        {post.description}
      </p>


      {/* CONTENT */}

      <div className="single-post-content">
        {post.content}
      </div>


      {/* AUTHOR */}

      <p className="single-post-author">
        By {post.author}
      </p>

    </div>

  );
}

export default BlogPost;