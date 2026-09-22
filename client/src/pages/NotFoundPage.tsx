import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="home-page">
      <h1 className="home-title">Page not found</h1>

      <p className="home-subtitle">
        The page you are looking for does not exist or the address is incorrect.
      </p>

      <div className="home-links">
        <Link to="/" className="home-link-card">
          <span className="home-link-title">Back to Home</span>

          <span className="home-link-description">
            Return to the B4F Hub home page.
          </span>
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
