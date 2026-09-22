import { Link } from "react-router-dom";

function NotFoundPage() {
     return (
    <div className="not-found-page">
      <p className="not-found-para">Page not found </p>
      <p className="not-found-para">The address you tried does not exist</p>
      <Link to="/" className="back-button">
        Back
      </Link>
    </div>
  );
}



export default NotFoundPage;