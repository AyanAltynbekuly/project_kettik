import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [car, setCar] = useState([]);
  useEffect(() => {
    axios.get("/cars").then((response) => {
      setCar(response.data);
    });
  }, []);

  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {car.length > 0 &&
        car.map((car) => (
          <Link to={"/car/" + car._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {car.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:8080/upload/" + car.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h3 className="font-bold"> {car.title} </h3>
            <h2 className="text-sm truncate text-gray "> {car.address}</h2>
            <div className="mt-1">
              <span className="font-bold">₸{car.price}</span> per day
            </div>
          </Link>
        ))}
    </div>
  );
}
