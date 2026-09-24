import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import BlogPost from "./BlogPost";

/* ========================================================= */
/* ===================== HOME PAGE ========================== */
/* ========================================================= */

function HomePage() {

  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Contact popup
  const [showContact, setShowContact] = useState(false);

  // Newsletter subscription
  const [email, setEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [subscribing, setSubscribing] = useState(false);


  /* ================= FETCH BLOG POSTS ================= */

  useEffect(() => {

    fetch("http://localhost:5000/api/posts")

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }

        return response.json();

      })

      .then((data) => {

        setBlogPosts(data);
        setLoading(false);

      })

      .catch((error) => {

        console.error("Error fetching posts:", error);

        setError("Unable to load blog posts.");

        setLoading(false);

      });

  }, []);


  /* ================= CONTACT POPUP ================= */

  const openContact = (event) => {

    event.preventDefault();

    setShowContact(true);

  };


  const closeContact = () => {

    setShowContact(false);

  };


  /* ================= NEWSLETTER SUBSCRIBE ================= */

  const handleSubscribe = async () => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    setSubscribeMessage("Please enter your email.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmedEmail)) {
    setSubscribeMessage("Please enter a valid email address.");
    return;
  }

    try {

      setSubscribing(true);

      setSubscribeMessage("");


      const response = await fetch(
        "http://localhost:5000/api/subscribe",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: trimmedEmail,
          }),

        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message || "Subscription failed."
        );

      }


      setSubscribeMessage(
        "Successfully subscribed!"
      );

      setEmail("");


    } catch (error) {

      console.error(
        "Subscription error:",
        error
      );

      setSubscribeMessage(
        error.message ||
        "Something went wrong. Please try again."
      );


    } finally {

      setSubscribing(false);

    }

  };


  return (

    <div className="app">


      {/* ================================================= */}
      {/* ===================== NAVBAR ==================== */}
      {/* ================================================= */}

      <header className="navbar">

        <div className="nav-container">


          {/* LOGO + NAME */}

          <a
            href="#home"
            className="brand"
          >

            <img
              src="/pto-logo.png.jpeg"
              alt="Pharma Trade Promotion Organisation"
              className="brand-logo"
            />

           <div className="brand-text">
  <span className="brand-name">
    Pharma Trade Promotion Organisation
  </span>

  <span className="brand-subtitle">
    A Division of Alpha Konnect Concepts
  </span>
</div>

          </a>


          {/* NAVIGATION */}

          <nav className="nav-links">


            {/* HOME */}

            <a
              href="#home"
              className="active"
            >
              Home
            </a>


            {/* BLOG */}

            <a href="#blog">
              Blog
            </a>


            {/* CONTACT */}

            <a
              href="#contact"
              onClick={openContact}
            >
              Contact
            </a>


            {/* SUBSCRIBE */}

            <a
              href="#newsletter"
              className="subscribe-btn"
            >
              Subscribe <span>→</span>
            </a>


          </nav>

        </div>

      </header>


      {/* ================================================= */}
      {/* ====================== HERO ===================== */}
      {/* ================================================= */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-overlay"></div>


        <div className="hero-content">


          {/* LEFT */}

          <div className="hero-left">


            <h1>

              <span className="hero-dark">
                Connecting
              </span>

              <span className="hero-green">
                Pharma for a Healthier Tomorrow
              </span>

            </h1>


            <p className="hero-description">

              Promoting trade, fostering collaboration, and driving
              innovation in the pharmaceutical industry.

            </p>


            {/* SEARCH */}

            <div className="search-box">

              <span className="search-icon">
                ⌕
              </span>

              <input
              type="text"
                          placeholder="Search blog posts..."
                          value={searchTerm}
                          onChange={(event) => setSearchTerm(event.target.value)}
                          />

            </div>


            <p className="hero-small-text">

              Explore the latest insights, trends, and updates from
              the pharma and trade industry.

            </p>


          </div>


          {/* RIGHT */}

          <div className="hero-right-text">

            <h3>

              Better
              <br />

              Trade.
              <br />

              <span>
                Healthier
              </span>

              <br />

              Lives.

            </h3>


            <div className="green-line"></div>

          </div>


        </div>

      </section>


      {/* ================================================= */}
      {/* ====================== BLOG ===================== */}
      {/* ================================================= */}

      <section
        className="blog"
        id="blog"
      >

        <div className="section-container">


          <p className="section-label">
            LATEST UPDATES
          </p>


          <h2>
            From the PTO Blog
          </h2>


          {/* LOADING */}

          {loading && (

            <p style={{ textAlign: "center" }}>
              Loading blog posts...
            </p>

          )}


          {/* ERROR */}

          {error && (

            <p
              style={{
                textAlign: "center",
                color: "red",
              }}
            >
              {error}
            </p>

          )}


          {/* BLOG CARDS */}

          {!loading && !error && (

            <div className="blog-grid">

              {blogPosts
  .filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map((post) => (

                <article
                  className="blog-card"
                  key={post.id}
                >


                  {/* IMAGE */}

                  <div
                    className="card-image"
                    style={{
                      backgroundImage: `url("${post.image}")`,
                    }}
                  ></div>


                  <div className="card-content">


                    {/* CATEGORY */}

                    <span>
                      {post.category}
                    </span>


                    {/* DATE */}

                    <p className="post-date">
                      {post.date}
                    </p>


                    {/* TITLE */}

                    <h3>
                      {post.title}
                    </h3>


                    {/* DESCRIPTION */}

                    <p>
                      {post.description}
                    </p>


                    {/* READ MORE */}

                    <Link
                      to={`/post/${post.id}`}
                      className="read-more"
                    >
                      Read More →
                    </Link>


                  </div>

                </article>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* ================================================= */}
      {/* ==================== NEWSLETTER ================= */}
      {/* ================================================= */}

      <section
        className="newsletter"
        id="newsletter"
      >

        <div className="newsletter-container">


          <div className="newsletter-left">


            <div className="newsletter-icon">
              ✉
            </div>


            <div className="newsletter-text">

              <h3>
                Stay Updated
              </h3>


              <p>

                Subscribe to our newsletter for the latest news,
                insights, and opportunities in the pharmaceutical
                trade industry.

              </p>

            </div>


          </div>


          <div className="newsletter-right">


            <div className="newsletter-form">


              <div className="email-input">

                <span>
                  ✉
                </span>


                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                />

              </div>


              <button
                type="button"
                onClick={handleSubscribe}
                disabled={subscribing}
              >

                {subscribing
                  ? "Subscribing..."
                  : "Subscribe"}

              </button>


            </div>


            {/* SUBSCRIPTION MESSAGE */}

            {subscribeMessage && (

              <p className="subscribe-message">
                {subscribeMessage}
              </p>

            )}


            <p className="privacy-text">

              <span>
                ✓
              </span>

              We respect your privacy. No spam, ever.

            </p>


          </div>


        </div>

      </section>


      {/* ================================================= */}
      {/* ====================== FOOTER =================== */}
      {/* ================================================= */}

      <footer className="site-footer">

        <div className="footer-container">


          {/* FOOTER BRAND */}

          <div className="footer-brand">

            <a
              href="#home"
              className="footer-brand-link"
            >

              <img
                src="/pto-logo-white.png"
                alt="Pharma Trade Promotion Organisation"
              />

              <div className="footer-brand-text">

                <strong>
                  Pharma Trade Promotion Organisation
                </strong>

                <span>
                  – A Division of Alpha Konnect Concepts
                </span>

              </div>

            </a>

          </div>


          {/* FOOTER NAV */}

          <nav className="footer-nav">


            <a href="#home">
              Home
            </a>


            <span>|</span>


            <a href="#blog">
              Blog
            </a>


            <span>|</span>


            <a
              href="#contact"
              onClick={openContact}
            >
              Contact
            </a>


          </nav>


          {/* SOCIAL ICONS */}

          <div className="footer-social">

            <a
              href="#"
              aria-label="LinkedIn"
            >
              in
            </a>


            <a
              href="#"
              aria-label="Instagram"
            >
              ◎
            </a>


            <a
              href="#"
              aria-label="Facebook"
            >
              f
            </a>


            <a
              href="#"
              aria-label="YouTube"
            >
              ▶
            </a>

          </div>


          {/* COPYRIGHT */}

          <div className="footer-copyright">

            <p>
              © 2026 Pharma Trade Promotion Organisation.
            </p>

            <p>
              All rights reserved.
            </p>

          </div>


        </div>

      </footer>


      {/* ================================================= */}
      {/* ================= CONTACT POPUP ================= */}
      {/* ================================================= */}

      {showContact && (

        <div
          className="contact-overlay"
          onClick={closeContact}
        >


          <div
            className="contact-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >


            {/* CLOSE */}

            <button
              className="contact-close"
              onClick={closeContact}
              aria-label="Close contact popup"
            >
              ×
            </button>


            {/* HEADING */}

            <p className="contact-label">
              GET IN TOUCH
            </p>


            <h2>
              Contact PTO
            </h2>


            <p className="contact-description">
              Connect with us through any of the following:
            </p>


            {/* CONTACT OPTIONS */}

            <div className="contact-options">


              {/* GMAIL */}

              <a
                href="mailto:info@ptoblog.com"
                className="contact-option"
              >

                <span className="contact-icon">
                  ✉
                </span>

                <strong>
                  Gmail
                </strong>

              </a>


              {/* INSTAGRAM */}

              <a
                href="#"
                className="contact-option"
              >

                <span className="contact-icon">
                  ◎
                </span>

                <strong>
                  Instagram
                </strong>

              </a>


              {/* LINKEDIN */}

              <a
                href="#"
                className="contact-option"
              >

                <span className="contact-icon">
                  in
                </span>

                <strong>
                  LinkedIn
                </strong>

              </a>


            </div>


          </div>

        </div>

      )}


    </div>

  );

}


/* ========================================================= */
/* ======================= APP ROUTER ===================== */
/* ========================================================= */

function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* HOME */}

        <Route
          path="/"
          element={<HomePage />}
        />


        {/* INDIVIDUAL BLOG */}

        <Route
          path="/post/:id"
          element={<BlogPost />}
        />


      </Routes>

    </BrowserRouter>

  );

}


export default App;