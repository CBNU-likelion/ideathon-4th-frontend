import { useState, useEffect, useRef } from "react";
import "./Home.css";
import orbitLineImg from "./assets/orbit-line.png";
import planetImg from "./assets/planet.png";
import moonImg from "./assets/moon.png";
import roadmapIcon from "./assets/automation.png";
import coffeechatIcon from "./assets/3p.png";
import aiIcon from "./assets/smart_toy.png";
import profileIcon from "./assets/robot_2.png";

function App() {
  const [showHow, setShowHow] = useState(false);
  const [orbitScale, setOrbitScale] = useState(1);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    const update = () => setOrbitScale(Math.min(window.innerWidth, 430) / 430);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const go = (down: boolean) => {
      if (isAnimating.current) return;
      if (down && !showHow) {
        isAnimating.current = true;
        setShowHow(true);
        setTimeout(() => {
          isAnimating.current = false;
        }, 700);
      } else if (!down && showHow) {
        isAnimating.current = true;
        setShowHow(false);
        setTimeout(() => {
          isAnimating.current = false;
        }, 700);
      }
    };

    const onWheel = (e: WheelEvent) => go(e.deltaY > 0);
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 40) go(delta > 0);
    };

    window.addEventListener("wheel", onWheel);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [showHow]);

  return (
    <div className="flex min-h-screen justify-center bg-[#eef0fa]">
    <div className="relative h-screen w-full max-w-[430px] overflow-hidden bg-white">
      <div className={`sections-wrapper${showHow ? " show-how" : ""}`}>
        {/* Hero Section */}
        <section className="hero-section">
          <img src={planetImg} alt="" className="planet" />
          <img src={orbitLineImg} alt="" className="orbit-line" />
          <img
            src={moonImg}
            alt=""
            className="moon"
            style={{
              offsetPath: `path("M ${208*orbitScale},${-6*orbitScale} A ${130*orbitScale},${80*orbitScale},231,0,0,${370*orbitScale},${196*orbitScale} A ${130*orbitScale},${80*orbitScale},231,0,0,${208*orbitScale},${-6*orbitScale}")`
            } as React.CSSProperties}
          />

          <div className="hero-content">
            <h1 className="hero-title-black">
              AI의 객관적 지표, 현직자의 경험을 잇다
            </h1>
            <h1 className="hero-title-gradient">단 하나의 취준 성공 궤도</h1>
            <p className="hero-description">
              "AI가 설계하는 객관적 로드맵과 데이터 지표, 여기에 현직자와의 실무
              커피챗을 더해 당신의 성장을 완벽하게 서포트합니다. 지금 바로
              나만의 맞춤형 커리어 로드맵을 확인하세요."
            </p>
            <button className="login-button">로그인/회원가입 →</button>
          </div>

          <div
            className="scroll-indicator"
            onClick={() => {
              if (!isAnimating.current && !showHow) {
                isAnimating.current = true;
                setShowHow(true);
                setTimeout(() => { isAnimating.current = false; }, 700);
              }
            }}
          >
            <span>Scroll to learn more</span>
            <span className="chevron">⌄</span>
          </div>
        </section>

        {/* How it works Section */}
        <section className="how-section">
          <h2 className="how-title">How it works</h2>
          <p className="how-subtitle">
            뾰각이 길잃은 취준의 <span className="highlight">방향성</span>을
            찾아주는 방법
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-orb">
                <img src={moonImg} alt="" className="feature-orb-img" />
                <span>01</span>
              </div>
              <h3 className="feature-title">객관적인 데이터</h3>
              <p className="feature-desc">
                추상적인 합격자료가 아닌
                <br />
                실제 객관적인 데이터 기반 AI 추천
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-orb">
                <img src={moonImg} alt="" className="feature-orb-img" />
                <span>02</span>
              </div>
              <h3 className="feature-title">개인 맞춤 로드맵</h3>
              <p className="feature-desc">
                뻔한 루트가 아닌 실질적으로
                <br />
                나만을 위한 로드맵
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-orb">
                <img src={moonImg} alt="" className="feature-orb-img" />
                <span>03</span>
              </div>
              <h3 className="feature-title">현직자와 만남연결</h3>
              <p className="feature-desc">
                온라인을 넘어 오프라인으로
                <br />
                관련 현직자와 질문지까지 AI기반 맞춤 추천
              </p>
            </div>
          </div>
        </section>
      </div>

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
    </div>
    </div>
  );
}

export default App;
