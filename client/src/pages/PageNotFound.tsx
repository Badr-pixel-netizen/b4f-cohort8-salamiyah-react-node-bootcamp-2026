import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <section className="page-not-found" aria-labelledby="page-not-found-title">
      <p className="page-not-found-code">404</p>
      <h1 id="page-not-found-title">Page not found</h1>
      <p>The page you are looking for does not exist or may have moved.</p>
      <Link to="/" className="page-not-found-link">
        Back to home
      </Link>
    </section>
  );
}

export default PageNotFound;
