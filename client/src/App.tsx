import "./App.css";
import VisibilityContextProvider from "./context/visibilityContext";
import IdContextProvider from "./context/idContext";
import Home from "./components/Home/home";
import Trips from "./components/Trips/trips";
import TripDetail from "./components/TripsDetail/tripDetail";
import NewTripFrom from "./components/NewTripForm/newTripForm";
import UpdateTripFrom from "./components/UpdateTripForm/updateTripForm";
import UserRegistration from "./components/UserRegistration/userRegistration";
import UserLogin from "./components/UserLogin/userLogin";

function App() {
  return (
    <>
      <VisibilityContextProvider>
        <Home />
        <IdContextProvider>
          <Trips />
          <TripDetail />
          <UpdateTripFrom />
        </IdContextProvider>
        <NewTripFrom />
        <UserRegistration />
        <UserLogin />
      </VisibilityContextProvider>
    </>
  );
}

export default App;
