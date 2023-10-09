import { useState } from "react";
import reactLogo from "/assets/react.svg";
import techmindsLogo from "/assets/logo_techminds.svg";
import viteLogo from "/assets/vite.svg";
import "../../styles/app.css";

export default function Home() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://github.com/TechMinds-Group" target="_blank">
          <img
            src={techmindsLogo}
            className="logo techminds"
            alt="TechMinds logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>TechMinds</h1>
      <h2>Vite + React</h2>
      {/* using example environment variable in Vite Projects  */}
      <h3>{import.meta.env.VITE_ENVIRONMENT}</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite, React or TechMinds logos to learn more
      </p>
    </>
  );
}
