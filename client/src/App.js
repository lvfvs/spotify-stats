import "./App.css";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
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

            {profile && <h1>{profile.display_name}</h1>}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
