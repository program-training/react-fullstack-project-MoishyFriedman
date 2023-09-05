import { useContext } from "react";
import "../style.css";
import { visibilityContext } from "../../context/context";

export default function UpdateTripFrom(): JSX.Element | null {
  const context = useContext(visibilityContext);
  if (!context) return null;
  const { visibility, setVisibility } = context;
  return (
    <div className={visibility.updateTripForm}>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          name:
          <input></input>
        </label>
        <label>
          destination:
          <input></input>
        </label>
        <label>
          startDate:
          <input></input>
        </label>
        <label>
          endDate:
          <input></input>
        </label>
        <label>
          description:
          <input></input>
        </label>
        <label>
          price:
          <input></input>
        </label>
        <label>
          image:
          <input></input>
        </label>
        <label>
          activities:
          <input></input>
        </label>
        <button>update trip</button>
      </form>
      <button
        onClick={() =>
          setVisibility({
            ...visibility,
            updateTripForm: "invisible",
            trips: "visible",
          })
        }
      >
        trips page
      </button>
    </div>
  );
}
