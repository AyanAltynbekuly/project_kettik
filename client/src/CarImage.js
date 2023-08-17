import Image from "./Components/Image";

export default function CarImage({ car, index = 0, className }) {
  if (!car.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover";
  }
  return <Image className={className} src={car.photos[index]} alt="" />;
}
