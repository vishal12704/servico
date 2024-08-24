import React from "react";
import "./services_css/painting.css";
import { Link } from "react-router-dom";
// import Footer from "./Footer";
// import Footer from "./contact-page/Footer";

function Painting() {
    return (
        <>
            <section className="banner2">
                <div className="banner-info">
                    <h1>Painting</h1>
                    <div className="divider"></div>
                    <p>Service Providers are happy to hop over and help with interior home painting. </p>
                    <Link to="/servicemen?category=Painting"><button className="service-btn">Book Now</button></Link>
                </div>
            </section>
            <section className="service-info">
                {/* <h1>Electrical Help And Service</h1> */}
                <div className="service-wrap">

                    <div className="service-txt">
                        <h1>Home Painting Services</h1>
                        <div className="divider"></div>
                        <p>Are there buckets of paint sitting around that should be up on the wall right now? You probably had
                            a great vision for how you wanted your space to look, it’s just… painting’s never as easy as we think it is.
                            That's where Taskers come in: experienced painters for your home's interior. </p>
                        <p>Service Providers will take care to lay down the right tarps to protect your floors and furniture while painting.
                            You may not have to worry about moving all that furniture around after all!
                            (But if you ever do need to move or dispose of furniture, Taskers can help with that too!)</p>
                        <p>
                            Service Providers can do all the painting you need (and even clean up afterward). Hire a Tasker today!
                        </p>
                    </div>
                    <div className="service-img">
                        <img src="/images/painting2.jpg" alt="" />
                    </div>
                </div>
            </section>
            <section className="how-it-works">
                <div className="works-heading">
                    <h1>How It Works</h1>
                    <div className="divider"></div>
                </div>
                <div className="works-container">
                    <div className="choose-tasker">
                        <img src="/images/choose_tasker.jpeg" alt="" />
                        <div className="how-works-content">
                            <h2>Choose Your Tasker</h2>
                            <p>Browse trusted Taskers by skills, reviews, and price. Chat with them to confirm details.</p>
                        </div>

                    </div>
                    <div className="get-it-done">
                        <img src="/images/get_it_done.jpeg" alt="" />
                        <div className="how-works-content">
                            <h2>Get It Done!</h2>
                            <p>Your Tasker arrives and gets the job done. Pay securely and leave a review, all through TaskRabbit.</p>
                        </div>

                    </div>
                </div>
            </section>
            <section className="ready-to-hire">
                <div className="ready-img">
                    <img src="/images/family2.jpg" alt="" />
                </div>
                <div className="ready-txt">
                    <h1>Ready to hire a Service Provider?</h1>
                    <button className="service-btn">Find Help Now</button>
                </div>
            </section>


        </>
    )
}
export default Painting;