import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>The address you tried to open does not exist or has been moved.</p>
      <Link to="/" className="home-link-card">
        Back to Home Page
      </Link>
    </div>
  );
}

export default NotFoundPage;
