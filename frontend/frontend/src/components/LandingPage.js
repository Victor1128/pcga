import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage({ handleRequest }) {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRequest(e.target.website.value);
    navigate("/products");
  };

  return (
    <>
      <div className="circle-1"></div>
      <div className="circle-2"></div>
      <div className="half"></div>
      <div className="half-2"></div>
      <div className="landing-page">
        <h1 className="title">Welcome to Our Product Catalogue App!</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            name="website"
            type="text"
            placeholder="Enter a website"
          />
        </form>
      </div>
    </>
  );
}
