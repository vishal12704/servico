import "./about.css"
import Footer from "../footer/Footer"
export default function About() {
    return (

        <div className="about-sec">
            <div className="about-mission">
                <div className="info">
                    <h1>ABOUT US </h1>
                    <p>Our mission is to simplify and enhance the lives of individuals and businesses by providing a seamless online service booking platform that connects users with trusted service providers, offering convenience, reliability, and peace of mind with every booking.</p>
                </div>


            </div>
            <div className="work">
                <div className="who-img">

                </div>
                <div className="who-content">
                    <h1>WHO WE ARE</h1>
                    <h3>Welcome to Servico – your go-to destination for hassle-free online booking!</h3>
                    <p> We are a team of dedicated enthusiasts and technology experts who have come together to make your daily event planning experience as easy as possible.

                        At Servico, we understand that planning to schedule an appointment for service  can sometimes be overwhelming. </p>
                    <p>That's why we're here to simplify the process and provide you with a seamless and enjoyable booking experience.

                        Our platform provides you with the best deals, services  and schedule  that suit your preferences and budget. </p>
                </div>

            </div>

            <div className="services">
                <div className="what-content">
                    <h1>WHAT WE DO</h1>
                    <p>Our online service booking website provides a convenient and user-friendly platform for customers to effortlessly schedule and manage a wide range of services. From haircuts and spa appointments to car maintenance and home repairs, our website offers a seamless booking experience. </p>
                    <p>Users can browse through service providers, select their preferred date and time, and even read reviews to make informed choices. With secure payment options and automated reminders, our platform ensures a stress-free and efficient way for customers to access the services they need while helping service providers efficiently manage their bookings and schedules </p>
                </div>
                <div className="what-img">
                </div>

            </div>

            <div className="our-services">
                <h1> OUR SERVICES </h1>
                <div className="service-sec">
                    <div className="img-f1"></div>
                    <div className="img-services">
                        <img src="./src/assets/painter.jpg"></img>
                        <img src="./src/assets/plumber.jpg"></img>
                        <img src="./src/assets/homecleaner.jpg"></img>
                        <img src="./src/assets/electrician.jpg"></img>
                    </div>
                    <div className="img-f2"></div>

                </div>




            </div>
            <Footer />
        </div>
    )
}