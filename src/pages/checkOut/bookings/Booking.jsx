import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const Booking = () => {
  const[bookings, setBookings]= useState([])
  const { users } = useContext(AuthContext);

  const url = `http://localhost:5000/bookings?email=${users?.email}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return <div></div>;
};

export default Booking;
