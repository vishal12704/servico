import { useContext, useEffect } from "react";
import "./finalbooking.css"
import { UserContext, BookingContext } from "../../App";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

export default function FinalBooking(){
    const {user, setUser} = useContext(UserContext);
    const {booking, setBooking} = useContext(BookingContext);
    
    const navigate = useNavigate();
    // console.log(`user from context = ${user}`)

    function sendBookingRequest(){
        axios.post("http://localhost:8000/api/new-booking",
        {
            service:booking.selectedService,
            serviceperson:booking.servicePerson,
            startTime:booking.selectedDateTime
        },{withCredentials:true})
        .then((res)=>{
            console.log(res)
            navigate("/showBookings")
        })
        .catch((err)=>{
            console.log(err)
            if(err.response.status==403){
                navigate("/login")
            }
        })
    }
    
    useEffect(()=>{
        console.log(booking)
        if(!user){
            window.alert("You need to login to attempt booking.")
            navigate("/login");
        }
    },[])


    
        return(
            <div className="final-booking-page">
                <div className="slogan">
                <img src="/src/assets/completed-task.png"/>
            <h3>Congratulations! You're almost there. Just one last step to secure your booking and experience our exceptional service. </h3>
                </div>
    
                <div className="main-final-booking">
                    <div className="task-description">
                        <h4>Enter Your Task Description</h4>
                        <div className="task-detail">
                            <textarea className="text-area" rows={5}></textarea>
                        </div>
                        <button className="add-des">Add Description</button>
                        <hr className="break"></hr>
                        <div>
                        <img src="/src/assets/logo.png"/>
                        </div>
                        <p className="logo-para">Experience the convenience of booking your services online - anytime, anywhere.</p>
    
                    </div>
    
                    <div className="confirmation-sec">
                    <div className="detail-and-btn">
                    <div className="service-details">
                        {console.log(booking)}
                        <div className="service-profile-sec">
                            <h3>{booking.selectedService}</h3>
                            <div className="service-sec-image">
                            <img src="/src/assets/completed-task.png"/>
                            </div>
                            <p>{booking?.servicePerson}</p>
                        </div>
                        <div className="service-confirm-det">
                        <div className="single-det">
                            <img src="/src/assets/calendar.png" /><span>{`${booking?.selectedDateTime?.$d.toLocaleDateString()}`}</span>
                            </div>
                            <div className="single-det">
                            <img src="/src/assets/pin.png" /><span>{user?.location}</span>
                            </div>
                            <div className="single-det">
                            <img src="/src/assets/calendar.png" /><span>{`${booking?.selectedDateTime?.$d.toLocaleTimeString()}`}</span>
                            </div>
                        </div>
                    </div>
                    <button className="confirm-btn" onClick={sendBookingRequest}>Confirm Booking</button>
                    </div>
                    </div>
                </div>
            </div>
        )

}