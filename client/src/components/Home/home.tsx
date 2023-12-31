import { useContext } from "react";
import "../style.css";
import { visibilityContext } from "../../context/visibilityContext";

export default function Home(): JSX.Element | null {
  const context = useContext(visibilityContext);
  if (!context) return null;
  const { visibility, setVisibility } = context;
  return (
    <div className={visibility.home}>
      <h1>trips</h1>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <button
            onClick={() =>
              setVisibility({
                ...visibility,
                home: "invisible",
                trips: "visible",
              })
            }
          >
            all trips
          </button>
          <button
            onClick={() =>
              setVisibility({
                ...visibility,
                home: "invisible",
                userRegistration: "visible",
              })
            }
          >
            registration
          </button>
          <button
            onClick={() =>
              setVisibility({
                ...visibility,
                home: "invisible",
                userLogin: "visible",
              })
            }
          >
            login
          </button>
        </div>
      </nav>
    </div>
  );
}
