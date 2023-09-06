import { useContext, useState } from "react";
import "../style.css";
import { visibilityContext } from "../../context/context";

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

async function submitHandler(newTripData: Trip) {
  try {
    const data = await fetch("http://localhost:3000/api/trips", {
      method: "post",
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

export default function NewTripFrom(): JSX.Element | null {
  const [newTripData, setNewTripData] = useState<Trip>({
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
  return (
    <div className={visibility.newTripForm}>
      <form
        onSubmit={() => {
          submitHandler(newTripData);
        }}
      >
        <label>
          name:
          <input
            onChange={(e) => {
              setNewTripData({ ...newTripData, name: e.target.value });
            }}
          ></input>
        </label>
        <label>
          destination:
          <input
            onChange={(e) => {
              setNewTripData({ ...newTripData, destination: e.target.value });
            }}
          ></input>
        </label>
        <label>
          startDate:
          <input
            onChange={(e) => {
              setNewTripData({ ...newTripData, startDate: e.target.value });
            }}
          ></input>
        </label>
        <label>
          endDate:
          <input
            onChange={(e) => {
              setNewTripData({ ...newTripData, endDate: e.target.value });
            }}
          ></input>
        </label>
        <label>
          description:
          <input
            onChange={(e) => {
              setNewTripData({ ...newTripData, description: e.target.value });
            }}
          ></input>
        </label>
        <label>
          price:
          <input
            type="number"
            onChange={(e) => {
              setNewTripData({
                ...newTripData,
                price: parseInt(e.target.value),
              });
            }}
          ></input>
        </label>
        <label>
          image:
          <input
            onChange={(e) => {
              setNewTripData({ ...newTripData, image: e.target.value });
            }}
          ></input>
        </label>
        <label>
          activities:
          <input
            onChange={(e) => {
              setNewTripData({
                ...newTripData,
                activities: e.target.value.split(", "),
              });
            }}
          ></input>
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
