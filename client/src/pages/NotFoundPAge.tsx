import { useEffect } from "react";
import { Link } from "react-router-dom";


interface OpportunitiesPageProps {
  onNotify: (message: string, tone: "success" | "error") => void;
}

function HomePage({ onNotify }: OpportunitiesPageProps) {
    useEffect(()=>{
        onNotify("Page Not found","error");
    },[]);
  return (
    <section className="home-page">
      <h1 className="home-title">Page Not Found : Error 1200 </h1>
      <p className="home-subtitle">
        please make sure that the url is correct
      </p>
      <div className="home-links">
        <Link to="/" className="home-link-card">
          <span className="home-link-title">Back To Home Page</span>
          <span className="home-link-description">
          </span>
        </Link>

      </div>
    </section>
  );
}

export default HomePage;
