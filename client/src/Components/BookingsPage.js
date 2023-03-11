import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CarImage from "../CarImage";

export default function BookingsPage() {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    axios.get("/trips").then((response) => {
      setTrips(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div>
        <CarImage car={trips.car} />
      </div>
      <div>
        {trips?.length > 0 && trips.map((trip) => <div>{trip.tripStart}</div>)}
      </div>
    </div>
  );
}
