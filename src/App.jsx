import { useState, useEffect } from "react";
import Music from "./components/Music.jsx";
import "./App.css";

function App() {
  const [bgImage, setBgImage] = useState("2");
  useEffect(() => {
    if (window.YT) return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }, []);

  const handleBackgroundChange = () => {
    const newBg = Math.floor(Math.random() * 15 + 1);
    setBgImage(newBg === bgImage ? Math.floor(Math.random() * 15 + 1) : newBg);
  };

  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(./pixled/bg${bgImage}.png)` }}
    >
      <Music videoId="jfKfPfyJRdk" />
      <button className="bg-button" onClick={handleBackgroundChange}>
        Change Background
      </button>
    </div>
  );
}

export default App;
