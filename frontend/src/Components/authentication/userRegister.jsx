import { useState } from "react"
import axios from '../../../axios.config'
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import './Register.css'

export default function ClientRegister() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        location: '',
        username: '',
        password: '',

    })
    const registerUser = async (e) => {
        e.preventDefault()
        const { name, email, phone, location, username, password, address } = data;
        if (!name.trim()) {
            toast.error("Please enter your name.");
            return;
        }
        if (!email.trim()) {
            toast.error("Please enter your email.");
            return;
        }
        if (!phone.trim()) {
            toast.error("Please enter your phone.");
            return;
        }
        if (!address.trim()) {
            toast.error("Please enter your address.");
            return;
        }
        if (!location.trim()) {
            toast.error("Please enter your location.");
            return;
        }
        if (!username.trim()) {
            toast.error("Please enter your username.");
            return;
        }
        if (!password.trim()) {
            toast.error("Please enter your password.");
            return;
        }
        if (!phone.trim().match(/^[0-9]{10}$/)) {
            toast.error("Please enter valid phone (10-digit).");
            return;
        }
        if (!email.trim().match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi)) {
            toast.error("Please enter valid email.");
            return;
        }

        axios.post("/sign-up/user", data, { withCredentials: true })
            .then(data => {
                toast.success("Registered as user. Please login.");
                setTimeout(() => navigate("/login", { state: { userType: "client" } }), 3000)
            })
            .catch(err => {
                toast.error("Error occured while signing up.");
                console.error(err);
            })
    }
    return (
        <div>
            <form onSubmit={registerUser}>
                <div className="registerUser-form">
                    <div className="registerUser-container">
                        <div className="left-register">
                            <h1>Sign Up </h1>
                            <label className="name">Name:</label>
                            <input type="text" id="user-name" placeholder="Enter Name..." value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                            <label>Email:</label>
                            <input type="text" id="email" placeholder="Enter email..." value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                            <label>Phone:</label>
                            <input type="text" id="phone" placeholder="Enter Phone..." value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value.trim() })} />
                            <label>address:</label>
                            <input type="text" id="address" placeholder="Enter Address..." value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
                            <label>location:</label>
                            <select type="text" id="location" placeholder="Enter Location..." value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })}>
                                <option value="" hidden>Select a location.</option>
                                {locationArr.map((loc, i) => <option key={i} value={loc}>{loc}</option>)}
                            </select>
                            <label>Username:</label>
                            <input type="text" id="username" placeholder="Enter Username..." value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
                            <label>Password:</label>
                            <input type="password" id="password" placeholder="Enter Password..." value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                            {/* <label>User Type: </label>
                            <select name="userType" id="usertype" value={data.userType} onChange={(e) => setData({ ...data, userType: e.target.value })}> 
                            <option id="usertype" value="Contributor">Contributor</option>
                            <option id="usertype" value="Organization">Organization</option>
                            </select> */}
                            <p>Already have an account?<Link className='link' to='/login'>Login</Link></p>

                            <button className="confirm-btn" type='submit'>Submit</button>
                        </div>
                        {/* <div className="right-register">
                            <img src="../images/signup.png" alt="" width={200} height={200}/>  
                        </div>  */}
                    </div>
                </div>

            </form>
            <Toaster position="top-center" />
        </div>
    )
}

const locationArr = [
    "Adajan",
    "Athwa",
    "Bhatar",
    "Dindoli",
    "Ghod Dod Road",
    "Katargam",
    "Majura Gate",
    "Nanpura",
    "Pal",
    "Pandesara",
    "Piplod",
    "Sachin",
    "Sagrampura",
    "Saiyedpura",
    "Sarthana",
    "Udhana",
    "Varachha",
    "Vesu"
];
