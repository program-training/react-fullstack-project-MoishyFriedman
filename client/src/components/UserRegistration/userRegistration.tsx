import { useContext } from "react";
import "../style.css";
import { visibilityContext } from "../../context/context";

export default function UserRegistration(): JSX.Element | null {
  const context = useContext(visibilityContext);
  if (!context) return null;
  const { visibility, setVisibility } = context;
  return (
    <div className={visibility.userRegistration}>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          email:
          <input></input>
        </label>
        <label>
          password:
          <input></input>
        </label>
        <button>create user</button>
      </form>
      <button
        onClick={() =>
          setVisibility({
            ...visibility,
            userRegistration: "invisible",
            home: "visible",
          })
        }
      >
        Home page
      </button>
    </div>
  );
}
