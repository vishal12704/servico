import './App.css'
import Homepage from './HomePage'
import Navbar from './NavBar'
import ShowListOfServicers from "./Components/ServicemenShowCard/ShowListOfServicers"
import ContactPage from './Components/contact-page/ContactPage'
import PlumbingRepairs from './Components/services/PlumbingRepairs'
import ElectricalHelp from './Components/services/ElectricalHelp'
import ShowRequestsUpdate from "./Components/UpdateRequestCards/ShowRequestsUpdate"
import Painting from './Components/services/painting'
import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom'
import ServiceMen from './Components/servicemen/ServiceMen'
import About from './Components/about-page/About'
import Login from './Components/authentication/login'
import UserRegister from "./Components/authentication/userRegister.jsx"
import ServicemenRegister from "./Components/authentication/serviceRegister"
import FinalBooking from './Components/final-booking/FinalBooking'
import ShowClientBookings from './Components/ClientBookingRequests/ShowClientBookings'
// import Reviews from './Components/ServicemenShowCard/Reviews'
import { createContext, useState } from 'react'

export const UserContext = createContext();
export const BookingContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [booking, setBooking] = useState(null);
  return (
    <>
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
        <BookingContext.Provider value={{booking, setBooking}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/services" element={<ShowListOfServicers />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/service1" element={<PlumbingRepairs/>} />
          <Route path="/service2" element={<ElectricalHelp/>} />
          <Route path="/service3" element={<Painting/>} />
          <Route path="/servicemen" element={<ServiceMen />} />
          <Route path="/service3" element={<Painting/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/finalBook" element={<FinalBooking/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/customerSignUp" element={<UserRegister/>} />
          <Route path="/serviceProviderSignUp" element={<ServicemenRegister/>} />
          <Route path="/showBookings" element={<ShowClientBookings />} /> 
          <Route path="/showRequests" element={<ShowRequestsUpdate/>} />
          {/* <Route path="/reviews" element={<Reviews/>} /> */}

          {/* <Route path='/service1' Component={<ElectricalHelp/>}/> */}
        </Routes>
        </BookingContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
    </>
  )
}

export default App
