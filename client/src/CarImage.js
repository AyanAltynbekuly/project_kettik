export default function CarImage({ car, index = 0, className }) {
  if (!car.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover";
  }
  return (
    <img
      className={className}
      src={"http://localhost:8080/upload/" + car.photos[index]}
      alt=""
    />
  );
}
