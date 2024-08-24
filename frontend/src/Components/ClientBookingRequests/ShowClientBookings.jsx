import { useContext, useEffect, useState } from "react";
import style from "./ShowClientBooking.module.scss";
import axios from "../../../axios.config";
import { Box, Grid, Rating, Stack, Tab, Tabs } from "@mui/material";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";

function ShowClientBookings() {
  const [bookings, setBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [paidBookings, setPaidBookings] = useState([]);
  const [ongoingBookings, setOngoingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [tab, setTab] = useState(1);

  function moveToPaid(r) {
    setAcceptedBookings(acceptedBookings.filter((req) => req._id !== r._id));
    setPaidBookings([...paidBookings, { ...r, status: "PAID" }]);
  }

  const { user, setUser } = useContext(UserContext);

  function moveToCompleted(r) {
    setOngoingBookings(ongoingBookings.filter((req) => req._id !== r._id));
    setCompletedBookings([...completedBookings, { ...r, status: "COMPLETED" }]);
  }

  function refreshData(e) {
    let prevContent = e.target.textContent;
    e.target.textContent = "Loading";
    e.target.dataset.state = "loading";
    e.target.disabled = true;
    axios
      .get("/api/get-user-bookings", { withCredentials: true })
      .then((data) => {
        let b = data.data.bookings.sort(
          (x, y) => new Date(y.startTime) - new Date(x.startTime)
        );
        //   console.log(b)
        setBookings(b);
        setPendingBookings(b.filter((d) => d.status == "PENDING"));
        setAcceptedBookings(b.filter((d) => d.status == "ACCEPTED"));
        setPaidBookings(b.filter((d) => d.status == "PAID"));
        setOngoingBookings(b.filter((d) => d.status == "ONGOING"));
        setCompletedBookings(b.filter((d) => d.status == "COMPLETED"));
        e.target.textContent = prevContent;
        e.target.dataset.state = "normal";
        e.target.disabled = false;
      })
      .catch((err) => console.error(err));
    // doSomething().then((d) => {
    //   e.target.textContent = prevContent;
    //   e.target.dataset.state = "normal";
    //   e.target.disabled = false;
    // });
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.userType !== "client") {
      toast.error("You need to signin as a user first.");
      setTimeout(() => {
        navigate("/login", { state: { userType: "client" } });
      }, 3000);
    } else {
      axios
        .get("/api/get-user-bookings", { withCredentials: true })
        .then((data) => {
          let b = data.data.bookings.sort(
            (x, y) => new Date(y.startTime) - new Date(x.startTime)
          );
          console.log(b);
          setBookings(b);
          setPendingBookings(b.filter((d) => d.status == "PENDING"));
          setAcceptedBookings(b.filter((d) => d.status == "ACCEPTED"));
          setPaidBookings(b.filter((d) => d.status == "PAID"));
          setOngoingBookings(b.filter((d) => d.status == "ONGOING"));
          setCompletedBookings(b.filter((d) => d.status == "COMPLETED"));
        })
        .catch((err) => console.error(err));
    }
  }, []);
  return (
    <Box className={style.bookingsContainer}>
      <Tabs
        value={tab}
        onChange={(e, val) => setTab(val)}
        variant="scrollable"
        className={style.tabSwitcher}
      >
        <Tab label="Pending" />
        <Tab label="Accepted" />
        <Tab label="Paid" />
        <Tab label="Ongoing" />
        <Tab label="Completed" />
      </Tabs>
      <button
        className={style.refreshButton}
        data-state="normal"
        onClick={refreshData}
      >
        Refresh
      </button>
      <Stack gap={"1rem"} marginBlock={"1rem"} width={"80%"}>
        {tab == 0 &&
          pendingBookings.map((data, index) => (
            <BookingRequest
              key={index}
              serviceperson={data.servicePerson.name}
              service={data.service.name}
              status={data.status}
              startTime={data.startTime}
            />
          ))}
        {tab == 1 &&
          acceptedBookings.map((data, index) => (
            <AcceptedRequest
              key={index}
              serviceperson={data.servicePerson.name}
              service={data.service.name}
              status={data.status}
              startTime={data.startTime}
              id={data._id}
              fare={data.fare}
              switchToPaid={() => moveToPaid(data)}
            />
          ))}
        {tab == 2 &&
          paidBookings.map((data, index) => (
            <PaidRequest
              key={index}
              serviceperson={data.servicePerson.name}
              service={data.service.name}
              status={data.status}
              startTime={data.startTime}
            />
          ))}
        {tab == 3 &&
          ongoingBookings.map((data, index) => (
            <OngoingRequest
              key={index}
              serviceperson={data.servicePerson.name}
              service={data.service.name}
              status={data.status}
              startTime={data.startTime}
              move={() => moveToCompleted(data)}
              id={data._id}
            />
          ))}
        {tab == 4 &&
          completedBookings.map((data, index) => (
            <CompletedRequest
              key={index}
              serviceperson={data.servicePerson.name}
              service={data.service.name}
              status={data.status}
              startTime={data.startTime}
              move={() => moveToCompleted(data)}
              id={data._id}
            />
          ))}
      </Stack>
      {/* {bookings.map((data, index)=><BookingRequest key={index} serviceperson={data.servicePerson.name} service={data.service.name} status={data.status} startTime={data.startTime}/>)} */}

      <Toaster position="top-center" />
    </Box>
  );
}

function BookingRequest(props) {
  useEffect(() => {
    // console.log(props)
  }, []);

  return (
    <div className={style.bookingCard}>
      <span className={style.imageContainer}>
        <img
          src={`https://ui-avatars.com/api/?name=${props.serviceperson}&background=random`}
        />
      </span>
      <span className={style.servicepersonName}>{props.serviceperson}</span>
      <span className={style.serviceName}>{props.service}</span>
      <span className={style.bookingTime}>
        {new Date(props.startTime).toLocaleString()}
      </span>
      <span className={style.bookingStatus}>Status: {props.status}</span>
    </div>
  );
}

function AcceptedRequest(props) {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  async function getToken() {
    setLoading(true);
    axios
      .get("/api/get-payment-token")
      .then((data) => {
        setClientToken(data.data.clientToken);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching payment token.");
        setLoading(false);
      });
  }

  function makePayment() {
    if (instance) {
      instance.requestPaymentMethod().then((data) => {
        // console.log(data);
        axios
          .post("/api/process-payment", {
            nonce: data.nonce,
            amount: props.fare,
            bookingId: props.id,
          })
          .then((data) => {
            console.log(data);
            setInstance(null);
            setClientToken(null);
            setPaid(true);
            props.switchToPaid();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    } else {
      toast.error("Could not complete payment.");
    }
  }

  // useEffect(()=>{
  //     console.log(props)
  // })
  return (
    <div className={style.acceptedRequest}>
      <div className={style.profilePhoto}>
        <img
          src={`https://ui-avatars.com/api/?name=${props.serviceperson}&background=random`}
        />
      </div>
      <div className={style.contents}>
        <span>{props.serviceperson}</span>
        <span>Accepted</span>
        <span>{props.service}</span>
        <span>{new Date(props.startTime).toLocaleString()}</span>
        {!instance && (
          <button onClick={getToken} disabled={loading || paid}>
            {loading
              ? "Loading"
              : paid
                ? "Payment succesfully done"
                : "Proceed to Pay"}
          </button>
        )}
      </div>
      {clientToken && (
        <div className={style.payment}>
          {/* <span>{clientToken.slice(0,10) + "..." + clientToken.slice(-10)}</span> */}
          <DropIn
            options={{ authorization: clientToken }}
            onInstance={(instance) => {
              setInstance(instance);
            }}
          />
          <button onClick={makePayment}>Pay</button>
        </div>
      )}
      {/* {paid && <span>Payment Successfully done</span>} */}
      <Toaster position="top-center" />
    </div>
  );
}

function PaidRequest(props) {
  return (
    <div className={style.bookingCard}>
      <span className={style.imageContainer}>
        <img
          src={`https://ui-avatars.com/api/?name=${props.serviceperson}&background=random`}
        />
      </span>
      <span className={style.servicepersonName}>{props.serviceperson}</span>
      <span className={style.serviceName}>{props.service}</span>
      <span className={style.bookingTime}>
        {new Date(props.startTime).toLocaleString()}
      </span>
      <span className={style.bookingStatus}>Status: {props.status}</span>
    </div>
  );
}

function OngoingRequest(props) {
  const [modalState, setModalState] = useState(false);
  const [feedback, setFeedback] = useState({
    behaviour: null,
    cleanliness: null,
    efficiency: null,
    overall: null,
    star: null,
  });
  // const [starRating, setStarRating] = useState(null);
  function markAsCompleted() {
    console.log({ bookingId: props.id, ...feedback });
    axios
      .post(
        "/api/completeBooking",
        { bookingId: props.id, feedback: feedback },
        { withCredentials: true }
      )
      .then(() => {
        // console.log("successfully sent request to move to ongoing");
        props.move();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div className={style.bookingCard}>
      <span className={style.imageContainer}>
        <img
          src={`https://ui-avatars.com/api/?name=${props.serviceperson}&background=random`}
        />
      </span>
      <span className={style.servicepersonName}>{props.serviceperson}</span>
      <span className={style.serviceName}>{props.service}</span>
      <span className={style.bookingTime}>
        {new Date(props.startTime).toLocaleString()}
      </span>
      <span className={style.bookingStatus}>Status: {props.status}</span>
      {!modalState ? (
        <>
          <button
            onClick={() => setModalState(true)}
            className={style.completeButton}
          >
            Mark as completed
          </button>
        </>
      ) : (
        <div className={style.feedbackContainer}>
          <Rating
            style={{ placeSelf: "center" }}
            onChange={(e, value) => {
              setFeedback((val) => {
                // console.log(val);
                return { ...val, star: value };
              });
            }}
          />
          <p>Please provide feedback for features asked below</p>
          <label>Efficiency</label>
          <input
            type="text"
            onChange={(e) => {
              setFeedback((val) => {
                // console.log(val);
                return { ...val, efficiency: e.target.value };
              });
            }}
          />
          <label>Behaviour</label>
          <input
            type="text"
            onChange={(e) => {
              setFeedback((val) => {
                // console.log(val);
                return { ...val, behaviour: e.target.value };
              });
            }}
          />
          <label>Cleanliness</label>
          <input
            type="text"
            onChange={(e) => {
              setFeedback((val) => {
                // console.log(val);
                return { ...val, cleanliness: e.target.value };
              });
            }}
          />
          <label>Overall</label>
          <input
            type="text"
            onChange={(e) => {
              setFeedback((val) => {
                // console.log(val);
                return { ...val, overall: e.target.value };
              });
            }}
          />
          <button onClick={markAsCompleted}>Complete</button>
        </div>
      )}
    </div>
  );
}

function CompletedRequest(props) {
  return (
    <div className={style.bookingCard}>
      <span className={style.imageContainer}>
        <img
          src={`https://ui-avatars.com/api/?name=${props.serviceperson}&background=random`}
        />
      </span>
      <span className={style.servicepersonName}>{props.serviceperson}</span>
      <span className={style.serviceName}>{props.service}</span>
      <span className={style.bookingTime}>
        {new Date(props.startTime).toLocaleString()}
      </span>
      <span className={style.bookingStatus}>Status: {props.status}</span>
    </div>
  );
}

export default ShowClientBookings;
