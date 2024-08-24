import React from "react";
import "./services_css/PlumbingService.css";
import { Link } from "react-router-dom";
// import Footer from "./Footer";
// import Footer from "./contact-page/Footer";

function PlumbingRepairs() {
    return (
        <>
            {/* <Footer/> */}
            <section className="banner1">
                <div className="banner-info">
                    <h1>Plumbing Repairs</h1>
                    <div className="divider"></div>
                    <p>Service Providers can provide plumbing repairs so you can clear your schedule and rest easy.
                        Hire a plumber today!</p>
                    <Link to="/servicemen?category=Plumbing Repairs"><button className="service-btn">Book Now</button></Link>
                </div>
            </section>
            <section className="service-info">
                {/* <h1>Electrical Help And Service</h1> */}
                <div className="service-wrap">

                    <div className="service-txt">
                        <h1>Plumbing repairs and services</h1>
                        <div className="divider"></div>
                        <p>You need to find someone to lend a hand with plumbing issues,
                            but you don’t want to hire someone you can’t trust. After all, your home or office’s
                            plumbing system is pretty important, and you can’t afford to gamble with it.
                            Don’t worry - that’s why Servico is here!</p>
                        <p>Offering a simple-to-use online platform chock-full of Service Providers with plumbing experience,
                            Servico is your go-to for virtually any plumbing need you might have.</p>
                        <p>
                            Don't try to do it all on your own. Hire a Service Provider for pumbling help today!
                        </p>
                    </div>
                    <div className="service-img">
                        <img src="https://plus.unsplash.com/premium_photo-1663013675008-bd5a7898ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGx1bWJlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
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
                            <h2>Choose Your Service Provider</h2>
                            <p>Browse trusted service providers by skills.</p>
                        </div>

                    </div>
                    <div className="get-it-done">
                        <img src="/images/get_it_done.jpeg" alt="" />
                        <div className="how-works-content">
                            <h2>Get It Done!</h2>
                            <p>Your service provider arrives and gets the job done. Pay securely and leave a review, all through Servico.</p>
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
export default PlumbingRepairs;