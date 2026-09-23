import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The address you tried to visit does not exist.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default NotFoundPage;
