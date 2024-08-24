import React from 'react';
import Footer from "./Components/footer/Footer";
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

export default function Homepage() {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      {/* Main Content of home screen */}
      <section className="home-page">
        <div className="home-wrap">
          <h1>Servico: Connecting You with Trusted Service Professionals</h1>
          <h3>
            At Servico, we believe in simplifying your life by connecting you
            with a network of dedicated Service Professionals who are ready to
            assist you in various aspects of your daily routine. Our mission is
            to empower you with convenience, quality, and trustworthiness.
          </h3>
        </div>
        <div className="help-btn">
          <a href="#service-cards">Book Now</a>
        </div>
      </section>

      {/* SERVICE CARDS */}
      {/* <Link to="/services">Services</Link> */}
      <section id="service-cards" className="service-cardss">
        <div class="servicetext">
          <h2>Our Services</h2>
        </div>
        <div className="service-containers">

          {/* PLUMBING SERVICE  */}
          <div className="services-card">
            <div className="services-main">
              <h3>Plumbing Repairs</h3>
            </div>
            <div className="services-content">
              <h3>Plumbing Repairs</h3>
              <p>Avg. Project: ₹400-₹500</p>
              <button className="services-btn" onClick={() => { navigate('/service1') }}>Book Now</button>
            </div>
          </div>

          {/* ELECTIRCAL SERVICE  */}
          <div className="services-card">
            <div className="service-img">
              <img src="images/electrical.jpeg" width="480" height="310" />
            </div>
            <div className="services-content">
              <h3>Electrical Help</h3>
              <p>Avg. Project: ₹500-₹600</p>
              <button className="services-btn" onClick={() => { navigate('/service2') }}>Book Now</button>
            </div>
          </div>

          {/* PAINTING SERVICE  */}
          <div className="services-card">
            <div className="service-img">
              <img src="images/painting.jpeg" width="480" height="310" />
            </div>
            <div className="services-content">
              <h3>Painting</h3>
              <p>Avg. Project: ₹700-₹800</p>
              <button className="services-btn" onClick={() => { navigate('/service1') }}>Book Now</button>
            </div>
          </div>
        </div>

        <div className="service-containers">

          <div className="services-card">
            <div className="service-img">
              <img src="images/cleaning.jpg" width="480" height="310" />
            </div>
            <div className="services-content">
              <h3>Home Cleaning</h3>
              <p>Avg. Project: ₹200-₹300</p>
              <button className="services-btn" onClick={() => { navigate('/service1') }}>Book Now</button>
            </div>
          </div>
          <div className="services-card">
            <div className="service-img">
              <img src="images/furniture.jpg" width="480" height="310" />
            </div>
            <div className="services-content">
              <h3>Furniture Assembly</h3>
              <p>Avg. Project: ₹100-₹200</p>
              <button className="services-btn" onClick={() => { navigate('/service1') }}>Book Now</button>
            </div>
          </div>

          <div className="services-card">
            <div className="service-img">
              <img src="images/lifting.jpeg" width="480" height="310" />
            </div>
            <div className="services-content">
              <h3>Heavy Lifting</h3>
              <p>Avg. Project: ₹200-₹300</p>
              <button className="services-btn" onClick={() => { navigate('/service1') }}>Book Now</button>
            </div>
          </div>

        </div>
      </section>
      <section className="book-info">
        <div className="info-content">
          <h1>Simplify Your Daily Routine</h1>
          <h3>When life gets hectic, you don't have to handle it all on your own.
            Reclaim your time for the things you enjoy, without overspending.</h3>
          <p>Select your Service Provider based on reviews, skills, and pricing</p>
          <p>Set a schedule that suits you - as soon as today.</p>
        </div>
        <div className="info-img">
          {/* <img src="images/booking.jpg" alt="" /> */}
          <img src="images/book_info.jpg" alt="" />

        </div>


      </section>
      <Footer />
    </div>
  );
}
