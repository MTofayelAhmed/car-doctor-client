import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import BookingTable from "../../bookingTable/BookingTable";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const { users } = useContext(AuthContext);

  const url = `http://localhost:5000/bookings?email=${users?.email}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
       setBookings(data);
      });
  }, []);



  const handleDelete = (id) => {
    const proceed = confirm("are your to Delete");
    if (proceed) {
      fetch(`http://localhost:5000/bookings/${id}`,{
        method: "DELETE"
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if(data.deletedCount> 0){
            alert('deleted Successfully')
          }
       
          const remaining = bookings.filter(booking => booking._id !== id)
          setBookings(remaining)
        });
    }
  };

  return (
    <div className="overflow-x-auto w-full">
    <table className="table w-full">
      {/* head */}
      <thead>
        <tr>
          <th>
           
          </th>
          <th>Image</th>
          <th>Service</th>
          <th>Date</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
       
      {bookings.map(booking => <BookingTable
       key={booking._id}
       booking= {booking}
       handleDelete={handleDelete}
       
       ></BookingTable>)}
       
       
      </tbody>
     
      
    </table>
  </div>);
};

export default Booking;
