import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>ERROR 404</h1>
      <p>this page is not Found</p>
      <Link to="/">Back to the Main Page</Link>
    </div>
  );
}
export default NotFound;
