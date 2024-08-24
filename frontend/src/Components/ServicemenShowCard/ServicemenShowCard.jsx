import React, { useContext, useState } from "react";
import styles from "./ServicemenShowCard.module.css";
import ReviewsModal from "./ReviewsModal";
import { Link, useNavigate } from "react-router-dom";
import { BookingContext } from "../../App";


function ServicemenShowCard(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { booking, setBooking } = useContext(BookingContext);
  const navigate = useNavigate();
  // console.log(props.selectedDateTime)

  const openModal = () => {
    console.log("Opening modal...");
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.servicemenCard} style={{ animationDelay: `${props.index * 100}ms` }}>
        <div className={styles.leftContainer}>
          <div className={styles.servicerImg}>
            <img src={props.image ? props.image : "https://api.dicebear.com/8.x/pixel-art/svg"} alt={props.name} />
          </div>
          <div className={styles.completeProfile}>
            <a href="#" onClick={openModal}>View Profile and Reviews</a>
          </div>
          <div className={styles.book}>
            <button className={styles.bookBtn} onClick={() => {
              if (props.disableBooking) {
                alert("Please select details for booking")
              }
              else {
                setBooking({
                  servicePerson: props.username,
                  selectedDateTime: props.selectedDateTime,
                  selectedService: props.selectedService
                })
                navigate("/finalBook")
              }
            }}>Book Now</button>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.nameAndPrice}>
            <div className={styles.name}>
              <h1>{props.name}</h1>
            </div>
            <div className={styles.price}>
              <h1>{props.fare}</h1>
            </div>
            {/* <span>{props.rating}</span> */}
          </div>
          <div className={styles.help}>
            <span className={styles.logo}> <StarLogo className={styles.starLogo} /><label>Ratings :
              {props.rating ? props.rating.rating.toFixed(1) : "NA"}
            </label></span>
            <h2>How I Can Help : </h2>
            <div className={styles.aboutDiv}>
              <p className={styles.about}>{props.about}</p>
            </div>
            <a href="#">Read More</a>
          </div>
        </div>
        {isModalOpen && <ReviewsModal onClose={closeModal} name={props.name} />}
      </div>
    </>

  );
}


function StarLogo() {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 47.94 47.94"
      xmlSpace="preserve"
      fill="#ffffff"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          style={{ fill: "var(--accent)" }}
          d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"
        />
      </g>
    </svg>
  );
}

export default ServicemenShowCard;