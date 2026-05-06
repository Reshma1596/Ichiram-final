import { useState, useEffect } from "react";
import "./about.css";
import heroImg from "../assets/hero-ramen.png";

const levels = [
  { size: 6, coupon: "10% OFF – RAMEN10" },
  { size: 7, coupon: "20% OFF – TOKYO20" },
  { size: 8, coupon: "25% OFF – NOODLE25" },
  { size: 9, coupon: "30% OFF – BROTH30" },
];

function AboutUs() {
  const [level, setLevel] = useState(0);
  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const [dots, setDots] = useState([]);
  const [reward, setReward] = useState("");

  const gridSize = levels[level].size;

  useEffect(() => {
    const newDots = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (!(x === 0 && y === 0)) newDots.push({ x, y });
      }
    }
    setDots(newDots);
    setPlayer({ x: 0, y: 0 });
  }, [level]);

  useEffect(() => {
    const move = (e) => {
      setPlayer((p) => {
        let { x, y } = p;
        if (e.key === "ArrowUp") y = Math.max(0, y - 1);
        if (e.key === "ArrowDown") y = Math.min(gridSize - 1, y + 1);
        if (e.key === "ArrowLeft") x = Math.max(0, x - 1);
        if (e.key === "ArrowRight") x = Math.min(gridSize - 1, x + 1);
        return { x, y };
      });
    };
    window.addEventListener("keydown", move);
    return () => window.removeEventListener("keydown", move);
  }, [gridSize]);

  useEffect(() => {
    setDots((d) => d.filter((dot) => !(dot.x === player.x && dot.y === player.y)));
  }, [player]);

  useEffect(() => {
    if (dots.length === 0) {
      setReward(levels[level].coupon);
      if (level < 3) setLevel(level + 1);
    }
  }, [dots]);

  return (
    <div className="about-page">
      <div className="hero">
        <img src={heroImg} alt="Ichiramen Neon Sign" />
        <div className="hero-text">
          <h1>IchiraMen</h1>
          <p>Digital Ramen Dining Experience</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="info-card">
          <h2>Our Story</h2>
          <p>IchiraMen recreates the modern ramen shop experience where customers browse and order directly from a tablet for a seamless dining flow.</p>
        </div>

        <div className="info-card">
          <h2>The Experience</h2>
          <ul>
            <li>Visual menu browsing</li>
            <li>Step-by-step ordering</li>
            <li>Cart review before checkout</li>
            <li>Fast and accurate service</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>Built With</h2>
          <p>This full-stack application uses React for the frontend and Node/Express for backend APIs to simulate real restaurant ordering systems.</p>
        </div>
      </div>

      <section className="game-section">
        <h2>Ramen Run – Win Coupons</h2>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 30px)` }}>
          {Array.from({ length: gridSize * gridSize }).map((_, i) => {
            const x = i % gridSize;
            const y = Math.floor(i / gridSize);
            const isPlayer = player.x === x && player.y === y;
            const isDot = dots.some((d) => d.x === x && d.y === y);
            return (
              <div key={i} className="cell">
                {isDot && <div className="dot"></div>}
                {isPlayer && <div className="player"></div>}
              </div>
            );
          })}
        </div>
        <p className="level">Level {level + 1} / 4</p>
        {reward && <div className="reward">{reward}</div>}
      </section>
    </div>
  );
}

export default AboutUs;