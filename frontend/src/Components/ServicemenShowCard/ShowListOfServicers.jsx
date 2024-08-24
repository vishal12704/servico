import React, { useState, useEffect } from "react";
// import { faker } from "@faker-js/faker";
import ServicemenShowCard from "./ServicemenShowCard";
import style from "./ShowListOfServicers.module.css";
import ReviewsModal from "./ReviewsModal";

function ShowListOfServicers(props) {

  // console.log(props.selectedDateTime)

  return (
    <div className={style.listServicers}>
      {props.servicePeople.map((person, index) => (
        <ServicemenShowCard
          key={index}
          index={index}
          fare={person.servicesOffered.fare ? person.servicesOffered.fare : 200}
          name={person.name}
          image={person.image_url}
          rating={person.rating}
          about={person.bio}
          username={person.username}
          disableBooking={props.disableBooking}
          selectedService={props.selectedService}
          selectedDateTime={props.selectedDateTime}
        />
        
      ))}
    </div>
  );
}

export default ShowListOfServicers;
