import { useContext, useState } from "react";
import "../style.css";
import { visibilityContext } from "../../context/visibilityContext";

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
    const token: string = JSON.parse(
      localStorage.getItem("tokensList") as string
    );
    const data = await fetch("http://localhost:3000/api/trips", {
      method: "post",
      headers: {
        authorization: token,
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
      <nav>
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
      </nav>
      <h1>new trip</h1>
      <form
        className="card h-100 "
        onSubmit={() => {
          submitHandler(newTripData);
        }}
      >
        <label className="form-label">
          name:
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setNewTripData({ ...newTripData, name: e.target.value });
            }}
          ></input>
        </label>
        <label className="form-label">
          destination:
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setNewTripData({ ...newTripData, destination: e.target.value });
            }}
          ></input>
        </label>
        <label className="form-label">
          startDate:
          <input
            type="date"
            className="form-control"
            onChange={(e) => {
              setNewTripData({ ...newTripData, startDate: e.target.value });
            }}
          ></input>
        </label>
        <label className="form-label">
          endDate:
          <input
            type="date"
            className="form-control"
            onChange={(e) => {
              setNewTripData({ ...newTripData, endDate: e.target.value });
            }}
          ></input>
        </label>
        <label className="form-label">
          description:
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setNewTripData({ ...newTripData, description: e.target.value });
            }}
          ></input>
        </label>
        <label className="form-label">
          price:
          <input
            className="form-control"
            type="number"
            onChange={(e) => {
              setNewTripData({
                ...newTripData,
                price: parseInt(e.target.value),
              });
            }}
          ></input>
        </label>
        <label className="form-label">
          image:
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setNewTripData({ ...newTripData, image: e.target.value });
            }}
          ></input>
        </label>
        <label className="form-label">
          activities:
          <input
            type="text"
            className="form-control"
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
    </div>
  );
}
