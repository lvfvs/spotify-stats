import { accessToken, logout } from "./spotify";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a
            className="App-link"
            href="http://localhost:8888/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            Login to Spotify
          </a>
        ) : (
          <>
            <h1>Logged in</h1>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
