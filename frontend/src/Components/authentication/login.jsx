// import React from "react";
import "./login.css";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios.config";
function Login(){
    const {user, setUser} = useContext(UserContext);
    const navigateState = useLocation();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const userTypeRef = useRef(null);
    const navigate = useNavigate();
    // console.log(navigateState.state)
    
    function validateAndLogin(){
        if(usernameRef.current.value.trim().length==0){
            window.alert("Please enter username")
            return
        }
        if(passwordRef.current.value.trim().length==0){
            window.alert("Please enter password")
            return
        }
        if(userTypeRef.current.value!="Client" && userTypeRef.current.value!="Serviceperson"){
            window.alert("Please select a valid user type to login.")
            return
        }
        // console.log(userTypeRef.current.value)
        if(userTypeRef.current.value=="Client"){
            axios.post("/sign-in/user",{username: usernameRef.current.value, password:passwordRef.current.value}, {withCredentials: true})
            .then(data=>{
                window.alert(`Log In Successfull, Welcome ${data.data.name}`)
                // console.log(data.data);
                setUser({...data.data, userType:"client"});
                navigate("/");
            })
            .catch(err=>console.error(err))
        }
        else{
            axios.post("/sign-in/serviceperson",{username: usernameRef.current.value, password:passwordRef.current.value}, {withCredentials: true})
            .then(data=>{
                window.alert(`Log In Successfull, Welcome ${data.data.name}`)
                // console.log(data);
                setUser({...data.data,userType:"serviceperson"});
                navigate("/");
            })
            .catch(err=>console.error(err.response.data))

        }

    }
    return(
        // <h1>hi shifa login</h1>
        <section className="login-section">
            <div className="sub-login-section">
                <div className="left-login">
                    <h1>Login</h1>
                    {/* <h2>User Name</h2> */}
                    <label htmlFor="username">User Name:</label> <br/>
                    <input ref={usernameRef} type="text" id="username" name="username" placeholder="Enter you User Name" required/><br/>
                    <label htmlFor="password">Password:</label><br/>
                    <input ref={passwordRef} type="password" id="password" name="password" placeholder="Enter you Password" required/><br/>
                    <select ref={userTypeRef}>
                        <option value={""} hidden>Select a user Type</option>
                        <option value={"Client"} selected={navigateState.state?.userType == "client"}>Client</option>
                        <option value={"Serviceperson"} selected={navigateState.state?.userType == "serviceperson"}>Service Provider</option>
                    </select>
                    <p>New here? <br />Sign up today as a{' '}
                        <Link to="/customerSignUp">Customer</Link>{' '}
                        or{' '}
                        <Link to="/serviceProviderSignUp">Service Provider</Link>!
                    </p>
                    <button className="confirm-btn" onClick={validateAndLogin}>Login</button>
                </div>
                <div className="right-login">
                    <img src="/images/login.jpg" alt="" width={200} height={200}/>
                </div>

            </div>

        </section>

    )
}
export default Login;