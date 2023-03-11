import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function newUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        firstName,
        lastName,
        email,
        password,
      });
      alert("Welcome! Go ahead and login");
    } catch (e) {
      alert("ERROR. Try again later");
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-8">
        <h1 className="text-4xl text-center mb-4">Let's get started</h1>
        <form className="max-w-md 2xl mx-auto" onSubmit={newUser}>
          <input
            type="text"
            placeholder="Samat"
            value={firstName}
            onChange={(ev) => setFirstName(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Kalshabekov"
            value={lastName}
            onChange={(ev) => setLastName(ev.target.value)}
          />
          <p> Enter your name as it appears on your driver's license </p>
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
          <button className="primary"> Sign up </button>
          <div className="text-center py-2">
            Already have an account?{" "}
            <Link className=" text-black" to={"/login"}>
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
