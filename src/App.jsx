import MusicPlayer from "./components/MusicPlayer";
import BrowserHistory from "./components/BrowserHistory";
import "./App.css";

function App() {
  return (
    <div className="app">
      <MusicPlayer />

      <div style={{ marginTop: "40px" }}>
        <BrowserHistory />
      </div>
    </div>
  );
}

export default App;