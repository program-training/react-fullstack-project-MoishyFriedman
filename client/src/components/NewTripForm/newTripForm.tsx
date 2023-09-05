import { useContext, useRef } from "react";
import "../style.css";
import { visibilityContext } from "../../context/context";

interface Trip {
  name?: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  price?: number;
  image?: string;
  activities?: string[];
}

async function submitHandler() {
  try {
    const data = await fetch("http://localhost:3000/api/trips/", {
      method: "post",
    });
    if (!data) throw new Error(`data can't found`);
  } catch (error) {
    console.log(error);
  }
}

export default function NewTripFrom(): JSX.Element | null {
  const inputName = useRef<HTMLInputElement>(null);
  const inputDestination = useRef<HTMLInputElement>(null);
  const inputStartDate = useRef<HTMLInputElement>(null);
  const inputEndDate = useRef<HTMLInputElement>(null);
  const inputDescription = useRef<HTMLInputElement>(null);
  const inputPrice = useRef<HTMLInputElement>(null);
  const inputImage = useRef<HTMLInputElement>(null);
  const inputActivities = useRef<HTMLInputElement>(null);

  const newTrip: Trip = {
    name: inputName.current?.value,
    destination: inputDestination.current?.value,
    startDate: inputStartDate.current?.value,
    endDate: inputEndDate.current?.value,
    description: inputDescription.current?.value,
    price: parseInt(inputPrice.current?.value),
    image: inputImage.current?.value,
    activities: [inputActivities.current?.value],
  };

  const context = useContext(visibilityContext);
  if (!context) return null;
  const { visibility, setVisibility } = context;
  return (
    <div className={visibility.newTripForm}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitHandler();
        }}
      >
        <label>
          name:
          <input ref={inputName}></input>
        </label>
        <label>
          destination:
          <input ref={inputDestination}></input>
        </label>
        <label>
          startDate:
          <input ref={inputStartDate}></input>
        </label>
        <label>
          endDate:
          <input ref={inputEndDate}></input>
        </label>
        <label>
          description:
          <input ref={inputDescription}></input>
        </label>
        <label>
          price:
          <input type="number" ref={inputPrice}></input>
        </label>
        <label>
          image:
          <input ref={inputImage}></input>
        </label>
        <label>
          activities:
          <input ref={inputActivities}></input>
        </label>
        <button>add new trip</button>
      </form>
      <button
        onClick={() =>
          setVisibility({
            ...visibility,
            newTripForm: "invisible",
            trips: "visible",
          })
        }
      >
        trips page
      </button>
    </div>
  );
}
