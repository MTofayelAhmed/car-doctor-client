import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import BookingTable from "../../bookingTable/BookingTable";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const { users } = useContext(AuthContext);

  const url = `http://localhost:5000/bookings?email=${users?.email}`;

  useEffect(() => {
    fetch(url,{
      'method': 'GET',
      headers: { 
        authorization: `bearer ${localStorage.getItem('car-access-token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
      });
  }, []);

  const handleDelete = (id) => {
    const proceed = confirm("are your to Delete");
    if (proceed) {
      fetch(`http://localhost:5000/bookings/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("deleted Successfully");
          }

          const remaining = bookings.filter((booking) => booking._id !== id);
          setBookings(remaining);
        });
    }
  };

  const handleConfirm = (id) => {
    fetch(`http://localhost:5000/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "confirm" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const remaining = bookings.filter((booking) => booking._id !== id);
          const updated = bookings.find((booking) => booking._id === id);
          updated.status = "confirm";
          const updatedBooking = [updated, ...remaining];
          setBookings(updatedBooking);
        }
      });
  };
  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Service</th>
            <th>Date</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {bookings.map((booking) => (
            <BookingTable
              key={booking._id}
              booking={booking}
              handleDelete={handleDelete}
              handleConfirm={handleConfirm}
            ></BookingTable>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
