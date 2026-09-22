import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <p className="not-found-code">404</p>
      <h1 id="not-found-title" className="not-found-title">
        Page not found
      </h1>
      <p className="not-found-description">
        The page you're looking for may have moved or no longer exists.
        Head back home to explore the community and discover opportunities.
      </p>
      <Link to="/" className="not-found-home-link">
        <span aria-hidden="true">←</span> Back to home
      </Link>
    </section>
  );
}
