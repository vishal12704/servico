import React, { useContext, useEffect, useState } from "react";
import style from "./ShowRequests.module.css";
import axios from "../../../axios.config";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function ShowRequestsUpdate() {
  // const [requests, setRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [paidRequests, setPaidRequests] = useState([]);
  const [ongoingRequests, setOngoingRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);

  function handleAccept(request) {
    setPendingRequests((prevRequests) =>
      prevRequests.filter((req) => req._id !== request._id)
    );
    setAcceptedRequests((prevRequests) => [
      ...prevRequests,
      { ...request, status: "ACCEPTED" },
    ]);
  }

  function handleReject(request) {
    setPendingRequests((prevRequests) =>
      prevRequests.filter((req) => req._id !== request._id)
    );
    setRejectedRequests((prevRequests) => [
      ...prevRequests,
      { ...request, status: "REJECTED" },
    ]);
  }

  const getData = async () => {
    try {
      const data = await axios.get("/api/get-serviceperson-bookings", {
        withCredentials: true,
      });
      // console.log(data)
      if (data && data.status == 200) {
        let bookings = data.data.bookings.sort(
          (x, y) => new Date(y.startTime) - new Date(x.startTime)
        );
        // console.log(data.data.bookings)
        // setRequests(bookings)
        // console.log("accepted",bookings.filter(x=>x.status=="ACCEPTED"))
        setAcceptedRequests(bookings.filter((x) => x.status == "ACCEPTED"));
        // console.log("rejected",bookings.filter(x=>x.status=="REJECTED"))
        setRejectedRequests(bookings.filter((x) => x.status == "REJECTED"));
        // console.log("pending",bookings.filter(x=>x.status=="PENDING"))
        setPendingRequests(bookings.filter((x) => x.status === "PENDING"));
        setPaidRequests(bookings.filter((x) => x.status === "PAID"));
        setOngoingRequests(bookings.filter((x) => x.status === "ONGOING"));
        setCompletedRequests(bookings.filter((x) => x.status === "COMPLETED"));
      }
    } catch (error) {
      console.error(error.response.data);
    }

    // await axios.get("/api/get-serviceperson-bookings",{withCredentials:true})
    // .then(data=>{
    //   let bookings = data.data.bookings;
    //   console.log(data.data.bookings)
    //   setRequests(data.data.bookings)
    //   console.log("accepted",bookings.filter(x=>x.status=="ACCEPTED"))
    //   setAcceptedRequests(bookings.filter(x=>x.status=="ACCEPTED"))
    //   setRejectedRequests(data.data.bookings.filter(x=>x.status=="REJECTED"))
    //   setPendingRequests(bookings.filter(x => x.status === "PENDING"));
    //   // console.log("accepted",acceptedRequests)
    //   // console.log("rejected",rejectedRequests)
    // })
    // .catch(err=>console.error(err.response.data))
  };

  useEffect(() => {
    getData();

    // const interval = setInterval(() => {
    //   getData();
    // }, 3000);

    // return () => {
    //   clearInterval(interval);
    // }
  }, []);
  function start(index) {
    let b = paidRequests[index];
    console.log(b);
    axios
      .get("/api/startBooking?bookingId=" + b._id, { withCredentials: true })
      .then(() => {
        setPaidRequests([
          ...paidRequests.slice(0, index),
          ...paidRequests.slice(index + 1, paidRequests.length),
        ]);
        setOngoingRequests([{ ...b, status: "ONGOING" }, ...ongoingRequests]);
        // setPaidRequests([...paidRequests].splice(index,1))
        // setOngoingRequests([b,...ongoingRequests]);
      });
  }
  function refreshData(e) {
    let prevContent = e.target.textContent;
    e.target.textContent = "Loading";
    e.target.dataset.state = "loading";
    e.target.disabled = true;
    getData().then(() => {
      e.target.textContent = prevContent;
      e.target.dataset.state = "normal";
      e.target.disabled = false;
    });
  }

  return (
    <div className={style.mainPage}>
      <Tabs className={style.reactTabs}>
        <TabList className={style.reactTablist}>
          <Tab>Pending Requests</Tab>
          <Tab>Accepted Requests</Tab>
          <Tab>Paid Requests</Tab>
          <Tab>Ongoing Requests</Tab>
          <Tab>Completed Requests</Tab>
        </TabList>
        <button
          className={style.refreshButton}
          data-state="normal"
          onClick={refreshData}
        >
          Refresh
        </button>
        <div>
          <TabPanel className={style.requestsList}>
            {pendingRequests &&
              pendingRequests.map((r, index) => (
                <RequestCardUpdate
                  key={index}
                  clientName={r.user.name}
                  location={r.user.location}
                  startTime={r.startTime}
                  service={r.service.name}
                  bookingId={r._id}
                  status={r.status}
                  onAccept={() => handleAccept(r)}
                  onReject={() => handleReject(r)}
                  index={index}
                />
              ))}
          </TabPanel>

          <TabPanel className={style.requestsList}>
            {acceptedRequests &&
              acceptedRequests.map((r, index) => (
                <RequestCardUpdate
                  key={index}
                  clientName={r.user.name}
                  location={r.user.location}
                  startTime={r.startTime}
                  service={r.service.name}
                  bookingId={r._id}
                  status={r.status}
                  index={index}
                />
              ))}
          </TabPanel>
          <TabPanel className={style.requestsList}>
            {paidRequests &&
              paidRequests.map((r, index) => (
                <RequestCardUpdate
                  key={index}
                  clientName={r.user.name}
                  location={r.user.location}
                  startTime={r.startTime}
                  service={r.service.name}
                  bookingId={r._id}
                  status={r.status}
                  index={index}
                  start={() => start(index)}
                />
              ))}
          </TabPanel>
          <TabPanel className={style.requestsList}>
            {ongoingRequests &&
              ongoingRequests.map((r, index) => (
                <RequestCardUpdate
                  key={index}
                  clientName={r.user.name}
                  location={r.user.location}
                  startTime={r.startTime}
                  service={r.service.name}
                  bookingId={r._id}
                  status={r.status}
                  index={index}
                />
              ))}
          </TabPanel>
          <TabPanel className={style.requestsList}>
            {completedRequests.length != 0 ? (
              completedRequests.map((r, index) => (
                <RequestCardUpdate
                  key={index}
                  clientName={r.user.name}
                  location={r.user.location}
                  startTime={r.startTime}
                  service={r.service.name}
                  bookingId={r._id}
                  status={r.status}
                  index={index}
                />
              ))
            ) : (
              <span>No Completed Booking Requests yet</span>
            )}
          </TabPanel>
        </div>
      </Tabs>
      {/* {requests.map((r, index)=><RequestCardUpdate key={index} clientName={r.user.name} location={r.user.location} startTime={r.startTime} service={r.service.name} bookingId={r._id} status={r.status}/>)} */}
    </div>
  );
}

function RequestCardUpdate(props) {
  // const [status, setStatus] = useState(props.status);
  const { bookingId, clientName, location, startTime, service, status, start } =
    props;
  const [requestStatus, setRequestStatus] = useState(status);

  function accept() {
    axios
      .get("/api/accept-booking?bookingId=" + props.bookingId, {
        withCredentials: true,
      })
      .then(() => {
        setRequestStatus("ACCEPTED");
        props.onAccept(props);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function reject() {
    axios
      .get("/api/reject-booking?bookingId=" + props.bookingId, {
        withCredentials: true,
      })
      .then(() => {
        setRequestStatus("REJECTED");
        props.onReject(props);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className={style.requestCard}>
      <div className={style.leftContainer}>
        <div className={style.requestImage}>
          <img src="https://api.dicebear.com/8.x/pixel-art/svg" />
        </div>
      </div>
      <div className={style.rightContainer}>
        {/* <div className={style.requestDetails101}> */}
        {/* <span className={style.name}>Name :</span> */}
        <span className={style.clName}>{clientName}</span>
        {/* <span className={style.location}>Location :</span> */}
        <span className={style.locName}>{location}</span>
        <div className={style.requestDetails2}>
          <span>{new Date(startTime).toLocaleDateString()}</span>
          <span>{new Date(startTime).toLocaleTimeString()}</span>
        </div>
        <span className={style.service}>{service}</span>
        <div className={style.requestBtnContainer}>
          {requestStatus == "PENDING" ? (
            <>
              <button
                className={`${style.acceptBtn} ${style.bookBtn}`}
                onClick={accept}
              >
                Accept
              </button>
              <button
                className={`${style.rejectBtn} ${style.bookBtn}`}
                onClick={reject}
              >
                Reject
              </button>
            </>
          ) : (
            <span
              className={
                requestStatus === "ACCEPTED"
                  ? style.acceptedText
                  : style.rejectedText
              }
            >
              {requestStatus}
            </span>
          )}
        </div>
        {status === "PAID" &&
          Math.abs(new Date(startTime) - new Date()) <= 3600000 && (
            <button onClick={start}>Begin</button>
          )}
      </div>
    </div>
  );
}

export default ShowRequestsUpdate;
// import React, { useEffect, useState } from "react";
// import style from "./ShowRequests.module.css";
// import axios from "axios"
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

// function ShowRequestsUpdate() {
//   const [requests, setRequests] = useState([]);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [acceptedRequests, setAcceptedRequests] = useState([]);
//   const [rejectedRequests, setRejectedRequests] = useState([]);

//   function handleAccept(request) {
//     setPendingRequests((prevRequests) => prevRequests.filter(req => req._id !== request.bookingId));
//     setAcceptedRequests((prevRequests) => [...prevRequests, request]);
//   }

//   function handleReject(request) {
//     setPendingRequests((prevRequests) => prevRequests.filter(req => req._id !== request.bookingId));
//     setRejectedRequests((prevRequests) => [...prevRequests, request]);
//   }
//   useEffect(()=>{
//     const getData = async() => {
//       try {
//         const data = await axios.get("/api/get-serviceperson-bookings",{withCredentials:true});
//         console.log(data)
//         if(data && data.status == 200) {
//           let bookings = data.data.bookings;
//           console.log(data.data.bookings)
//           setRequests(data.data.bookings)
//           console.log("accepted",bookings.filter(x=>x.status=="ACCEPTED"))
//           setAcceptedRequests(bookings.filter(x=>x.status=="ACCEPTED"))
//           setRejectedRequests(data.data.bookings.filter(x=>x.status=="REJECTED"))
//           setPendingRequests(bookings.filter(x => x.status === "PENDING"));
//         }
//       } catch(error) {
//         console.error(error.response.data)
//       }

//       // await axios.get("/api/get-serviceperson-bookings",{withCredentials:true})
//       // .then(data=>{
//       //   let bookings = data.data.bookings;
//       //   console.log(data.data.bookings)
//       //   setRequests(data.data.bookings)
//       //   console.log("accepted",bookings.filter(x=>x.status=="ACCEPTED"))
//       //   setAcceptedRequests(bookings.filter(x=>x.status=="ACCEPTED"))
//       //   setRejectedRequests(data.data.bookings.filter(x=>x.status=="REJECTED"))
//       //   setPendingRequests(bookings.filter(x => x.status === "PENDING"));
//       //   // console.log("accepted",acceptedRequests)
//       //   // console.log("rejected",rejectedRequests)
//       // })
//       // .catch(err=>console.error(err.response.data))
//     }

//     getData();

//     const interval = setInterval(() => {
//       getData();
//     }, 3000);

//     return () => {
//       clearInterval(interval);
//     }
//   },[]);
//   return (
//     <div className={style.mainPage}>
//     <Tabs className={style.reactTabs}>
//         <TabList className={style.reactTablist}>
//           <Tab>Pending Requests</Tab>
//           <Tab>Accepted Requests</Tab>
//           <Tab>Rejected Requests</Tab>
//         </TabList>
//         <div>
//         <TabPanel className={style.requestsList}>
//           {pendingRequests && pendingRequests.map((r, index) => (
//             <RequestCardUpdate key={index} clientName={r.user.name} location={r.user.location} startTime={r.startTime} service={r.service.name} bookingId={r._id} status={r.status} onAccept={handleAccept} onReject={handleReject}/>
//           ))}
//         </TabPanel>

//         <TabPanel className={style.requestsList}>
//           {acceptedRequests && acceptedRequests.map((r, index) => (
//             <RequestCardUpdate key={index} clientName={r.user.name} location={r.user.location} startTime={r.startTime} service={r.service.name} bookingId={r._id} status={r.status} />
//           ))}
//         </TabPanel>
//         <TabPanel className={style.requestsList}>
//           {rejectedRequests && rejectedRequests.map((r, index) => (
//             <RequestCardUpdate key={index} clientName={r.user.name} location={r.user.location} startTime={r.startTime} service={r.service.name} bookingId={r._id} status={r.status}/>
//           ))}
//         </TabPanel>
//         </div>
//       </Tabs>
//       {/* {requests.map((r, index)=><RequestCardUpdate key={index} clientName={r.user.name} location={r.user.location} startTime={r.startTime} service={r.service.name} bookingId={r._id} status={r.status}/>)} */}
//     </div>
//   );
// }

// function RequestCardUpdate(props) {
//   // const [status, setStatus] = useState(props.status);
//   const { bookingId, clientName, location, startTime, service, status } = props;
//   const [requestStatus, setRequestStatus] = useState(status);

//   function accept() {
//     axios.get("/api/accept-booking?bookingId="+props.bookingId, {withCredentials: true})
//     .then(()=>{
//       setRequestStatus("ACCEPTED");
//       props.onAccept(props);
//     })
//     .catch((err)=>{console.error(err)})
//   }

//   function reject() {
//     axios.get("/api/reject-booking?bookingId="+props.bookingId, {withCredentials: true})
//     .then(()=>{
//       setRequestStatus("REJECTED");
//       props.onReject(props);
//     })
//     .catch((err)=>{console.error(err)})
//   }

//   return (
//     <div className={style.requestCard}>
//     <div className={style.leftContainer}>
//       <div className={style.requestImage}>
//         <img src="https://i.pravatar.cc/128" />
//       </div>
//       </div>
//       <div className={style.rightContainer}>
//       {/* <div className={style.requestDetails101}> */}
//       {/* <span className={style.name}>Name :</span> */}
//         <span className={style.clName}>{clientName}</span>
//         {/* <span className={style.location}>Location :</span> */}
//         <span className={style.locName}>{location}</span>
//       <div className={style.requestDetails2}>
//         <span>{new Date(startTime).toLocaleDateString()}</span>
//         <span>{new Date(startTime).toLocaleTimeString()}</span>
//       </div>
//       <span className={style.service}>{service}</span>
//       <div className={style.requestBtnContainer}>
//         {requestStatus == "PENDING" ? (
//           <>
//             <button className={`${style.acceptBtn} ${style.bookBtn}`} onClick={accept}>Accept</button>
//             <button className={`${style.rejectBtn} ${style.bookBtn}`} onClick={reject}>Reject</button>
//           </>
//         ) : (
//           <span className={requestStatus === "ACCEPTED" ? style.acceptedText : style.rejectedText}>
//             {requestStatus}
//           </span>
//         )}
//       </div>
//       </div>
//       </div>

//   );
// }

// export default ShowRequestsUpdate;
