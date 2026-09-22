import {Link} from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">Page Note Found</h2>
      <p className="not-found-text">
        It seems the URL is incorrect or the page has been moved
      </p>
      <Link to="/" className="not-found-link">
        Back to home
      </Link>
    </div>
  );
}
