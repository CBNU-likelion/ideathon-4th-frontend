import "./Navbar.css";
import roadmapIcon from "./assets/automation.png";
import coffeechatIcon from "./assets/3p.png";
import aiIcon from "./assets/smart_toy.png";
import profileIcon from "./assets/robot_2.png";

function Navbar() {
  return (
    <>
      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-items">
          <div className="nav-item">
            <div className="nav-icon">
              <img src={roadmapIcon} alt="" />
            </div>
            <span>로드맵</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon">
              <img src={coffeechatIcon} alt="" />
            </div>
            <span>커피챗</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon">
              <img src={aiIcon} alt="" />
            </div>
            <span>AI-분석</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon">
              <img src={profileIcon} alt="" />
            </div>
            <span>프로필</span>
          </div>
        </div>
        <div className="bottom-indicator" />
      </nav>
    </>
  );
}

export default Navbar;
