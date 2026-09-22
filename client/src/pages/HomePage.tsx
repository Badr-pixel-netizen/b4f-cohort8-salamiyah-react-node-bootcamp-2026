import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="home-page">
      <h1 className="home-title">Welcome to B4F Hub</h1>
      <p className="home-subtitle">
        Connect with the B4F community and discover job, internship, and
        scholarship opportunities — all in one place.
      </p>
      <div className="home-links">
        <Link to="/community" className="home-link-card">
          <span className="home-link-title">Community</span>
          <span className="home-link-description">
            See what trainees and alumni are posting.
          </span>
        </Link>

        <Link to="/opportunities" className="home-link-card">
          <span className="home-link-title">Opportunities</span>
          <span className="home-link-description">
            Browse jobs, internships, and scholarships.
          </span>
        </Link>
      </div>
    </section>
  );
}

export default HomePage;
