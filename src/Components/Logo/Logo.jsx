import { Link } from "react-router-dom";
import "./Logo.scss";

const Logo = () => {
  return (
    <main className="container h-100 text-center d-flex justify-content-center align-items-md-center my-3">
      <Link to="/">
        <h1>
          Stock<h2>Viewer</h2>
        </h1>
      </Link>
    </main>
  );
};

export default Logo;
