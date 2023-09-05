import { useContext } from "react";
import "../style.css";
import { visibilityContext } from "../../context/context";

export default function UserLogin(): JSX.Element | null {
  const context = useContext(visibilityContext);
  if (!context) return null;
  const { visibility, setVisibility } = context;
  return (
    <div className={visibility.userLogin}>
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
            userLogin: "invisible",
            home: "visible",
          })
        }
      >
        Home page
      </button>
    </div>
  );
}
