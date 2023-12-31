import { useContext, useState, useEffect } from "react";
import "../style.css";
import { visibilityContext } from "../../context/visibilityContext";
import { idContext } from "../../context/idContext";

interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  image: string;
}

async function deleteHandler(
  id: string,
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>
) {
  try {
    const token: string = JSON.parse(localStorage.getItem("token") as string);
    const data = await fetch("http://localhost:3000/api/trips/" + id, {
      method: "delete",
      headers: { authorization: token },
    });
    if (!data) throw new Error(`data can't found`);
    const deletedTrip = await data.json();
    setTrips((trips) => trips.filter((trip) => trip.id !== deletedTrip.id));
  } catch (error) {
    console.log(error);
  }
}

export default function Trips(): JSX.Element | null {
  const [trips, setTrips] = useState<Trip[]>([]);

  const context = useContext(visibilityContext);
  if (!context) return null;
  const { visibility, setVisibility } = context;

  const id = useContext(idContext);
  if (!id) return null;
  const { setUserId } = id;

  useEffect(() => {
    async function getTrips() {
      try {
        const data = await fetch("http://localhost:3000/api/trips");
        if (!data) throw new Error(`data can't found`);
        const trips: Trip[] = await data.json();
        setTrips(trips);
      } catch (error) {
        console.log(error);
      }
    }
    getTrips();
  }, []);

  return (
    <div className={visibility.trips}>
      <nav>
        <button
          onClick={() =>
            setVisibility({
              ...visibility,
              home: "visible",
              trips: "invisible",
            })
          }
        >
          Home page
        </button>
        <button
          onClick={() =>
            setVisibility({
              ...visibility,
              trips: "invisible",
              newTripForm: "visible",
            })
          }
        >
          add new trip
        </button>
      </nav>
      {trips.map((trip) => (
        <div
          onClick={() => {
            setUserId(trip.id);
            setVisibility({
              ...visibility,
              tripDetail: "visible",
              trips: "invisible",
            });
          }}
          id="card"
          key={trip.id}
          className="card h-100 "
        >
          <img className="card-img-top" src={trip.image}></img>
          <h2 className="card-title ">{trip.name}</h2>
          <h3 className="card-modal-title ">{trip.destination}</h3>
          <p className="card-text">
            {trip.startDate} - {trip.endDate}
          </p>
          <div>
            <span
              onClick={(event) => {
                event.stopPropagation();
                return deleteHandler(trip.id, setTrips);
              }}
              className="material-symbols-outlined"
            >
              delete
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
