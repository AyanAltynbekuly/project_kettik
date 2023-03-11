import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  async function LoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      alert("Login succesful");
      setRedirect(true);
    } catch (e) {
      alert("Login failed. Check your email and password");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-8">
        <h1 className="text-4xl text-center mb-4">Welcome back</h1>
        <form className="max-w-md 2xl" onSubmit={LoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary"> Login </button>
          <div className="text-center py-2">
            Don't have an account?{" "}
            <Link className=" text-black" to={"/registration"}>
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
