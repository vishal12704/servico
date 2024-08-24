import React from "react";
import "./services_css/ElectricalHelp.css";
import { Link } from "react-router-dom";
// import Footer from "./Footer";
// import Footer from "./contact-page/Footer";

function ElectricalHelp() {
    return (
        <>
            {/* <Footer/> */}
            <section className="banner">
                <div className="banner-info">
                    <h1>Electrical Help</h1>
                    <div className="divider"></div>
                    <p>Service Providers can provide electrical help so you can clear your schedule and rest easy.
                        Hire an electrical helper today!</p>
                    <Link to="/servicemen?category=Electrical Help"><button className="service-btn">Book Now</button></Link>
                </div>
            </section>
            <section className="service-info">
                {/* <h1>Electrical Help And Service</h1> */}
                <div className="service-wrap">

                    <div className="service-txt">
                        <h1>Electrical Help And Services</h1>
                        <div className="divider"></div>
                        <p>You need to find someone to lend a hand with electrical help,
                            but you don’t want to hire someone you can’t trust. After all, your home or office’s
                            electrical system is pretty important, and you can’t afford to gamble with it.
                            Don’t worry - that’s why Servico is here!</p>
                        <p>Offering a simple-to-use online platform chock-full of Service Providers with electrical experience,
                            Servico is your go-to for virtually any electrical need you might have.
                            From rewiring a wall to swapping out light fixtures - Service Providers do it all.</p>
                        <p>
                            Don't short circuit trying to do it all on your own. Hire a Service Provider for electrical help today!
                        </p>
                    </div>
                    <div className="service-img">
                        <img src="/images/electrical.jpeg" alt="" />
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
                            <p>Browse trusted service providers by skills, reviews, and price. Chat with them to confirm details.</p>
                        </div>

                    </div>
                    <div className="get-it-done">
                        <img src="/images/get_it_done.jpeg" alt="" />
                        <div className="how-works-content">
                            <h2>Get It Done!</h2>
                            <p>Your service provider arrives and gets the job done. Pay securely and leave a review, all through TaskRabbit.</p>
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
export default ElectricalHelp;