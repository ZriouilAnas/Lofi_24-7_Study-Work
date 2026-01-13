import { useEffect } from "react";
import Music from "./components/Music.jsx";
import Background from "./components/Background.jsx";
import { useBackground } from "./hooks/useBackground";
import "./App.css";

function App() {
  const { bgImage, handleBackgroundChange } = useBackground("1");

  useEffect(() => {
    if (window.YT) return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }, []);

  return (
    <Background bgImage={bgImage} handleBackgroundChange={handleBackgroundChange}>
      <Music videoId="jfKfPfyJRdk" />
    </Background>
  );
}

export default App;
