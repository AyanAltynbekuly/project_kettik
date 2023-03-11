import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import IndexPage from "./Components/IndexPage";
import Login from "./Components/Login";
import Layout from "./Layout";
import Registration from "./Components/Registration";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Profile from "./Components/Account";
import Cars from "./Components/Cars";
import NewCarForm from "./Components/NewCarForm";
import CarPage from "./Components/CarPage";
import BookingsPage from "./Components/BookingsPage";
import BookingPage from "./Components/BookingPage";

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/account/cars" element={<Cars />} />
          <Route path="/account/cars/new" element={<NewCarForm />} />
          <Route path="/account/cars/:id" element={<NewCarForm />} />
          <Route path="/car/:id" element={<CarPage />} />
          <Route path="/account/trips/" element={<BookingsPage />} />
          <Route path="/account/trips/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
