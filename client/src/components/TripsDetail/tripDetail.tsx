import { useContext, useEffect, useState } from "react";
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
  id: string;
}

export default function TripDetail(): JSX.Element | null {
  const [trip, setTrip] = useState<Trip | null>(null);

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
        setTrip(trip);
      } catch (error) {
        console.log(error);
      }
    }
    getTripById();
  }, [userId]);

  return (
    <div className={visibility.tripDetail}>
      {trip ? <div>{trip.destination}</div> : null}
      <div id="tripCard" key={trip?.id}>
        <img src={trip?.image}></img>
        <h2>{trip?.name}</h2>
        <h3>{trip?.destination}</h3>
        <p>{trip?.description}</p>
        <h4>{trip?.price}$</h4>
        <p>
          {trip?.startDate} - {trip?.endDate}
        </p>
        <p>{trip?.activities}</p>
        <span
          onClick={() =>
            setVisibility({
              ...visibility,
              updateTripForm: "visible",
              tripDetail: "invisible",
            })
          }
          className="material-symbols-outlined"
        >
          edit
        </span>
      </div>
      <button
        onClick={() =>
          setVisibility({
            ...visibility,
            tripDetail: "visible",
            trips: "visible",
          })
        }
      >
        trips page
      </button>
    </div>
  );
}
