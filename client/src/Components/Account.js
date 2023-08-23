import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import Cars from "./Cars";
import AccountNav from "./AccountNav";

export default function Profile() {
  const [redirect, setRedicrect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/api/logout");
    setRedicrect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/api/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.firstName} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            {" "}
            Logout{" "}
          </button>
        </div>
      )}
      {subpage === "cars" && <Cars />}
    </div>
  );
}
