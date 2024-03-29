export default function Image({ src, ...rest }) {
  src =
    src && src.includes("https://")
      ? src
      : "http://localhost:8080/api/upload/" + src;
  return <img {...rest} src={src} alt={""} />;
}
