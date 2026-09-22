import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1 className="not-found-title">page not found</h1>
      <Link to="/" className="not-found-link">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
