import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Service = () => {
const [services, setServices]= useState([])

useEffect(()=>{
  fetch('http://localhost:5000/services')
  .then(res => res.json())
  .then(data => {
    setServices(data)
  })
},[])



  return (
    <div className="my-6">
      <div className="text-center space-y-5 mb-6">
      <h3 className="text-5xl font-bold text-orange-600 ">Our Service Area </h3>
      <p>
        the majority have suffered alteration in some form, by injected humour,
        or randomised <br /> words which do not look even slightly believable.{" "}
      </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
       {
        services.map(service=> <ServiceCard key= {service._id} service={service}></ServiceCard>)
       }
      </div>
    </div>
  );
};

export default Service;
