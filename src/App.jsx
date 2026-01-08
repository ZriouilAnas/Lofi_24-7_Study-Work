import { useState, useEffect } from "react";
import Music from "./components/Music.jsx";
import "./App.css";

function App() {
  const [bgImage, setBgImage] = useState("1");
  useEffect(() => {
    if (window.YT) return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }, []);

  const handleBackgroundChange = () => {
    const newBg = bgImage + 1 > 15 ? 1 : bgImage + 1;
    setBgImage(newBg === bgImage ? Math.floor(Math.random() * 15 + 1) : newBg);
  };

  return (
    <div className="crt">
      <div className="crt-content">
        <div
          className="app-container"
          style={{ backgroundImage: `url(./pixled/bg${bgImage}.png)` }}
        >
          <Music videoId="jfKfPfyJRdk" />
          <button className="bg-button" onClick={handleBackgroundChange}>
            Change Background
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
