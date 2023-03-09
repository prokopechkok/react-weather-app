import "./App.css";
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather />
        <footer id="footer">
          <a
            href="https://github.com/prokopechkok/react-weather-app"
            target="_blank"
            rel="noreferrer"
          >
            Open-source code
          </a>{" "}
          by Khrystyna Prokopechko
        </footer>
      </div>
    </div>
  );
}
