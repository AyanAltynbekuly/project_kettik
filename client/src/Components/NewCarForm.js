import PhotosUploader from "./PhotosUploader";
import Features from "./Features";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import AccountNav from "./AccountNav";

export default function NewCarForm() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addPhotos, setAddPhotos] = useState("");
  const [description, setDescripton] = useState("");
  const [features, setFeatures] = useState([]);
  const [extra, setExtra] = useState("");
  const [tripStart, setTripStart] = useState("");
  const [tripEnd, setTripEnd] = useState("");
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [price, setPrice] = useState("10000");
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/cars/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddPhotos(data.photos);
      setDescripton(data.description);
      setFeatures(data.features);
      setExtra(data.extra);
      setTripStart(data.tripStart);
      setTripEnd(data.tripEnd);
      setPickUpLocation(data.pickUpLocation);
      setPrice(data.price);
    });
  }, [id]);
  function inputHeader(text) {
    return <h2 className="text-xl mt-4"> {text} </h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  async function saveCar(ev) {
    ev.preventDefault();
    const carData = {
      title,
      address,
      addPhotos,
      description,
      features,
      extra,
      tripStart,
      tripEnd,
      pickUpLocation,
      price,
    };
    if (id) {
      // update
      await axios.put("/cars", {
        id,
        ...carData,
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post("/cars", carData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/cars"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={saveCar}>
        {preInput("Car", "Which car do you have")}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: Dream of every Kazakh, but seriously which car do you have?"
        />
        {preInput("Adress", "Where is your car located?")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
        />
        {preInput("Photos")}
        <PhotosUploader addPhotos={addPhotos} onChange={setAddPhotos} />
        {preInput("Description", "Tell us more about it")}
        <textarea
          className="w-full border my-1 py-2 px-3 rounded-2xl"
          value={description}
          onChange={(ev) => setDescripton(ev.target.value)}
        />
        {preInput("Features", "select the ones that match your car")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <Features selected={features} onChange={setFeatures} />
        </div>
        {preInput(
          "Guidelines / Trip End",
          "Respectful use of the vehicle appreciated"
        )}
        <textarea
          rows="4"
          className="w-full border my-1 py-2 px-3 rounded-2xl"
          placeholder="Write your thoughts here..."
          value={extra}
          onChange={(ev) => setExtra(ev.target.value)}
        />
        {preInput("Trip Start / Trip End", "don't forget to clean^_^")}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Trip start</h3>
            <input
              type="text"
              value={tripStart}
              onChange={(ev) => setTripStart(ev.target.value)}
              placeholder="10:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Trip end</h3>

            <input
              type="text"
              value={tripEnd}
              onChange={(ev) => setTripEnd(ev.target.value)}
              placeholder="20:00"
            />
          </div>

          <div>
            <h3 className="mt-2 -mb-1">Pick up location</h3>
            <input
              type="text"
              value={pickUpLocation}
              onChange={(ev) => setPickUpLocation(ev.target.value)}
              placeholder="Almaty Airport"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per day</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
