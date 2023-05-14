import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const CheckOut = () => {
  const services = useLoaderData();
  const { price, _id, title, img } = services;
  console.log(services);

  const { users } = useContext(AuthContext);

  const handleCheckOut = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = form.email.value;
    const Booking = {
      img,
      service: title,
      customerName: name,
      date,
      email,
      price: price,
      service_id: _id,
    };

    console.log(Booking);
    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.insertedId) {
          alert("service booked Successfully");
        
        }
      });
  };

  return (
    <form onSubmit={handleCheckOut}>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input type="date" name="date" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            name="email"
            defaultValue={users?.email}
            placeholder="email"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Amount</span>
          </label>
          <input
            type="text"
            name="amount"
            defaultValue={"$" + price}
            className="input input-bordered"
          />
        </div>
      </div>
      <div className="form-control mt-6">
        <input className="btn btn-block" type="submit" value="Order Info" />
      </div>
    </form>
  );
};

export default CheckOut;
