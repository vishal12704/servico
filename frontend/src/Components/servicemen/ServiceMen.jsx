import React, { useEffect, useState } from "react";
import "./servicemen.css";
import ShowListOfServicers from "../ServicemenShowCard/ShowListOfServicers";
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "./../../../axios.config";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Box, Container, Stack } from "@mui/material";
import { DatePickerToolbar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
//import Modal from './Modal';

export default function ServiceMen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [servicePeople, setServicePeople] = useState([]);
  const [service, setService] = useState('');
  const [services, setServices] = useState([])
  // console.log(searchParams.get("category"));


  //   const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(null);

  // const openModal = () => {
  //   setModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const [showCalendar, setShowCalendar] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

  useEffect(() => {
    if (!searchParams.has("category")) {
      alert("Please mention category.");
      navigate("/");
    }
    axios
      .get(
        "/api/get-servicepeople/" +
        searchParams.get("category")
      )
      .then((res) => {
        // console.log(res.data.sort((x,y)=>x.rating.rating - y.rating.rating))
        let l = [...res.data.filter(x => x.rating !== null).sort((x, y) => y.rating.rating - x.rating.rating)];
        l = [...l, ...res.data.filter(x => x.rating === null)];
        console.log(l.map(m => m.rating))
        // console.log(l)
        setServicePeople(l);
      });
    axios.get(`/api/get-services-for-category/${searchParams.get("category")}`)
      .then(res => {
        setServices(res.data)
      })
  }, []);

  useEffect(() => {
    // console.log("resending new query...")
    // console.log(selectedDateTime)
    if (!searchParams.has("category")) {
      alert("Please mention category.");
      navigate("/");
    }
    axios
      .get(
        `/api/get-servicepeople/${searchParams.get("category")}?datetime=${selectedDateTime}`
      )
      .then((res) => {
        // console.log(res.data)
        let l = [...res.data.filter(x => x.rating !== null).sort((x, y) => y.rating.rating - x.rating.rating)];
        l = [...l, ...res.data.filter(x => x.rating === null)];
        console.log(l.map(m => m.rating))
        // console.log(l)
        setServicePeople(l);
      });
  }, [selectedDateTime]);

  return (
    <div className="select-servicemen">
      <div className="slogan">
        <img src="/src/assets/customer-service.png" />
        <h3>
          "Discover the Perfect Service Professional: Your Preferred Services,
          Our Expert Hands!"
        </h3>
      </div>
      <div className="main-section">
        <div className="filters">
          {/* <h4>Date</h4>
          <div className="date-selection">
            <div className="left-side-btns">
              <button className="date-btn">Today</button>
              <button className="date-btn">Within A Week</button>
            </div>
            <div className="right-side-btns">
              <button className="date-btn">Within 3 Days</button>
              <div>
                <button className="date-btn" onClick={handleCalendarToggle}>
                  Choose Date
                </button> */}
          {/* <Modal isOpen={showCalendar} onClose={handleCalendarToggle}>
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                  />
                </Modal> */}
          {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Calendar Modal"
      >
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          // Add any other props or configurations you need
        />
        <button onClick={closeModal}>Close</button>
        </Modal> */}
          {/* </div>
            </div>
          </div> */}
          <hr className="horizontal-line"></hr>
          <Stack spacing={4}>
            <h4>Time Of Day</h4>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker minDateTime={dayjs(new Date())} onAccept={val => setSelectedDateTime(val)} />
            </LocalizationProvider>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Service</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={service}
                label="Service"
                onChange={(event) => setService(event.target.value)}
              >
                {services.map((service, index) => <MenuItem key={index} value={service.name}>{service.name}</MenuItem>)}
              </Select>
            </FormControl>

            <div className="time-selection">
              <div className="checkbox-1">
                <input type="checkbox" />
                <p>Morning (8am to 12pm)</p>
              </div>
              <div className="checkbox-2">
                <input type="checkbox" />
                <p>Afternoon (12pm to 5 pm)</p>
              </div>
              <div className="checkbox-3">
                <input type="checkbox" />
                <p>Evening (5pm to 9:30pm)</p>
              </div>
            </div>
          </Stack>
          <hr className="horizontal-line"></hr>
          {/* <h4>Price</h4>
          <div className="price">
            <input type="range" list="value" />
            <datalist id="values">
              <option value={0} label="0"></option>
              <option value={100} label="100"></option>
            </datalist>
          </div> */}
        </div>

        <div className="servicemens">
          <ShowListOfServicers
            servicePeople={servicePeople}
            serviceCategory={searchParams.get("category")}
            disableBooking={!selectedDateTime || !service}
            selectedDateTime={selectedDateTime}
            selectedService={service}
          />
        </div>
      </div>
    </div>
  );
}
