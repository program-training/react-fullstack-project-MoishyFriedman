import { useContext, useState, useEffect } from "react";
import "../style.css";
import { visibilityContext } from "../../context/context";
import { idContext } from "../../context/idContext";

interface Trip {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  description: string;
  price: number;
  image: string;
  activities: string[];
}
async function submitHandler(newTripData: Trip, userId: string) {
  try {
    const data = await fetch("http://localhost:3000/api/trips/" + userId, {
      method: "put",
      headers: {
        authorization: "test-token",
        "content-Type": "application/json",
      },
      body: JSON.stringify(newTripData),
    });
    if (!data) throw new Error(`data can't found`);
  } catch (error) {
    console.log(error);
  }
}

export default function UpdateTripFrom(): JSX.Element | null {
  const [updateTrip, setUpdateTrip] = useState<Trip>({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    price: 0,
    image: "",
    activities: [],
  });

  const context = useContext(visibilityContext);
  if (!context) return null;
  const { visibility, setVisibility } = context;

  const id = useContext(idContext);
  if (!id) return null;
  const { userId } = id;

  useEffect(() => {
    async function getTripById() {
      try {
        const data = await fetch("http://localhost:3000/api/trips/" + userId);
        if (!data) throw new Error(`data can't found`);
        const trip: Trip = await data.json();
        setUpdateTrip(trip);
      } catch (error) {
        console.log(error);
      }
    }
    getTripById();
  }, [userId]);

  return (
    <div className={visibility.updateTripForm}>
      <form
        onSubmit={() => {
          submitHandler(updateTrip, userId);
        }}
      >
        <label>
          name:
          <input
            value={updateTrip.name}
            onChange={(e) => {
              setUpdateTrip({ ...updateTrip, name: e.target.value });
            }}
          ></input>
        </label>
        <label>
          destination:
          <input
            value={updateTrip.destination}
            onChange={(e) => {
              setUpdateTrip({ ...updateTrip, destination: e.target.value });
            }}
          ></input>
        </label>
        <label>
          startDate:
          <input
            value={updateTrip.startDate}
            onChange={(e) => {
              setUpdateTrip({ ...updateTrip, startDate: e.target.value });
            }}
          ></input>
        </label>
        <label>
          endDate:
          <input
            value={updateTrip.endDate}
            onChange={(e) => {
              setUpdateTrip({ ...updateTrip, endDate: e.target.value });
            }}
          ></input>
        </label>
        <label>
          description:
          <input
            value={updateTrip.description}
            onChange={(e) => {
              setUpdateTrip({ ...updateTrip, description: e.target.value });
            }}
          ></input>
        </label>
        <label>
          price:
          <input
            value={updateTrip.price}
            type="number"
            onChange={(e) => {
              setUpdateTrip({
                ...updateTrip,
                price: parseInt(e.target.value),
              });
            }}
          ></input>
        </label>
        <label>
          image:
          <input
            value={updateTrip.image}
            onChange={(e) => {
              setUpdateTrip({ ...updateTrip, image: e.target.value });
            }}
          ></input>
        </label>
        <label>
          activities:
          <input
            value={updateTrip.activities}
            onChange={(e) => {
              setUpdateTrip({
                ...updateTrip,
                activities: e.target.value.split(", "),
              });
            }}
          ></input>
        </label>
        <button>update trip</button>
      </form>
      <button
        onClick={() => {
          setVisibility({
            ...visibility,
            updateTripForm: "invisible",
            trips: "visible",
          });
        }}
      >
        trips page
      </button>
    </div>
  );
}
