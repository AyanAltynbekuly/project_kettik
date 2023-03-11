import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext.js";

export default function BookingWidget({ car }) {
  const [tripStart, setTripStart] = useState("");
  const [tripEnd, setTripEnd] = useState("");
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.firstName);
    }
  }, [user]);

  let numberOfDays = 0;
  if (tripStart && tripEnd) {
    numberOfDays = differenceInCalendarDays(
      new Date(tripEnd),
      new Date(tripStart)
    );
  }

  async function bookThisCar() {
    const response = await axios.post("/trips", {
      tripStart,
      tripEnd,
      pickUpLocation,
      name,
      phone,
      car: car._id,
      price: numberOfDays * car.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/trips/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center ">Price : ₸{car.price} per day</div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4 ">
            <label>Trip Start</label>
            <input
              type="date"
              value={tripStart}
              onChange={(ev) => setTripStart(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l ">
            <label>Trip End</label>
            <input
              type="date"
              value={tripEnd}
              onChange={(ev) => setTripEnd(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t ">
          <label>Pick Up Location</label>
          <input
            type="text"
            value={car.pickUpLocation}
            onChange={(ev) => setPickUpLocation(ev.target.value)}
          />
        </div>
        {numberOfDays > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        )}
      </div>

      <button onClick={bookThisCar} className="primary mt-4">
        Let's gooo
        {numberOfDays > 0 && <span> ₸{numberOfDays * car.price}</span>}
      </button>
    </div>
  );
}
