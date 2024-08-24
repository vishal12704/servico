import { useEffect, useState } from "react"
import axios from '../../../axios.config'
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import './Register.css'

export default function ServicemenRegister() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [servicesOffered, setServicesOffered] = useState([]);
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        location: '',
        bio: '',
        qualification: '',
        // servicesOffered:[],
        username: '',
        password: '',

    })
    const registerUser = async (e) => {
        e.preventDefault()
        const { name, email, phone, location, username, password, address, bio, qualification } = data;
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
        if (!qualification.trim()) {
            toast.error("Please enter your qualification.");
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
        if (servicesOffered.length <= 0) {
            toast.error("Please select at least one service.");
            return;
        }
        for (let s of servicesOffered) {
            if (s.fare <= 0) {
                toast.error("Please enter valid fare for " + s.name)
                return;
            }
        }
        // console.log(data,servicesOffered.map(s=>{delete (s.name);return s;}));

        axios.post("/sign-up/serviceperson", { ...data, servicesOffered: servicesOffered.map(s => { delete (s.name); return s; }) }, { withCredentials: true })
            .then(data => {
                toast.success("Registered as serviceperson. Please login.");
                setTimeout(() => navigate("/login", { state: { userType: "serviceperson" } }), 3000)
            })
            .catch(err => {
                toast.error("Error occured while signing up.");
                console.error(err);
            })
    }

    useEffect(() => {
        axios.get("/api/get-service-categories")
            .then(data => {
                console.log(data.data);
                setCategories(data.data)
            })
    }, [])

    return (
        <div>
            <form onSubmit={registerUser}>
                <div className="registerUser-form">
                    <div className="registerUser-container">
                        <div className="left-register">
                            <h1>Sign Up </h1>
                            <label className="name">Name:</label>
                            <input type="text" id="user-name" placeholder="Enter name..." value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                            <label>Email:</label>
                            <input type="text" id="email" placeholder="Enter email..." value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                            <label>Phone:</label>
                            <input type="text" id="phone" placeholder="Enter phone..." value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value.trim() })} />
                            <label>Address:</label>
                            <input type="text" id="address" placeholder="Enter address..." value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
                            <label>Location:</label>
                            <select id="location" value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })}>
                                <option value="" hidden>Select a location</option>
                                {locationArr.map((loc, i) => <option key={i} value={loc}>{loc}</option>)}
                            </select>
                            <label>Educational Qualification:</label>
                            <select id="qualification" value={data.qualification} onChange={(e) => setData({ ...data, qualification: e.target.value })}>
                                <option value="" hidden>Select a qualification</option>
                                {qualificationsArr.map((qualification, i) => <option key={i} value={qualification}>{qualification}</option>)}
                            </select>
                            <label>Offered Services:</label>
                            <select id="servicesOffered" onChange={(e) => {
                                let selectedServices = [];
                                for (const op of e.target.options) {
                                    if (op.selected) { selectedServices.push({ service: op.value, name: op.textContent, fare: 0 }) }
                                }
                                setServicesOffered(selectedServices)
                            }} >
                                <option value="" hidden>Select services</option>
                                {categories.map((s, i) => <option key={i} value={s._id}>{s.name}</option>)}
                            </select>
                            {servicesOffered.length > 0 && (
                                <div className="serviceEditor">
                                    {servicesOffered.map((s, i) => (
                                        <div key={i}>
                                            <span>{s.name}</span>
                                            <input
                                                placeholder="Enter your fare"
                                                type="number"
                                                onChange={(e) => {
                                                    let temp = [...servicesOffered];
                                                    temp[i] = { service: s.service, name: s.name, fare: Number(e.target.value) };
                                                    setServicesOffered(temp);
                                                }}
                                            ></input>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <label>Bio:</label>
                            <input type="text" id="bio" placeholder="enter bio..." value={data.bio} onChange={(e) => setData({ ...data, bio: e.target.value })} />
                            <label>Username:</label>
                            <input type="text" id="username" placeholder="Enter username..." value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
                            <label>Password:</label>
                            <input type="password" id="password" placeholder="Enter password..." value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
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

const qualificationsArr = [
    "Secondary School Leaving Certificate (SSC)",
    "Higher Secondary School Certificate (HSC)",
    "Diploma (various fields)",
    "Bachelor's Degree (B.A., B.Sc., B.Com., etc.)",
    "Master's Degree (M.A., M.Sc., M.Com., etc.)",
    "Professional Certifications (e.g., CISA, PMP, CFA)",
    "Vocational training certificates (e.g., electrician, mechanic, beautician)",
    "Apprenticeship programs",
    "Online courses and certifications"
]

// const services = [
// {
//   "_id": "6514429095402ea423785bcc",
//   "name": "Electrical Help",
//   "description": "Any kind of assistance related to electrical applicances or power boards for your house.",
//   "image_url": "https://media.istockphoto.com/id/1007046542/photo/electrical-terminal-in-junction-box-and-service-by-technician-electrical-device-install-in.jpg?s=1024x1024&w=is&k=20&c=T1pNGQf1Ss-Jd_GbtREJyO83PYvyu_j9k7p6qzYjqgA=" 
// },
//   {
//   "_id": "6514429095402ea423785bcd",
//   "name": "Painting",
//   "description": "Need an artist for a beautiful and mesmerizing piece of visual art, search no more..",
//   "image_url": "https://media.istockphoto.com/id/1183183783/photo/female-artist-works-on-abstract-oil-painting-moving-paint-brush-energetically-she-creates.jpg?s=1024x1024&w=is&k=20&c=XjERsAzJ3ePdYNUqyH8bm0vu93B_E8ASIwVgOsS8v6s="
// }
// ]