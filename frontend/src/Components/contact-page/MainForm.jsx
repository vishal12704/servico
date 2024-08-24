import "./css_files/MainForm.css";
import ContactForm from "./ContactForm";

export default function MainForm() {
    return (
        <div className="main-section">
            <div className="info-div">
                <div className="contact-info">
                    <h1 className="heading">Have Questions?</h1>
                    <p className="para">Please feel free to call or email us, or use our contact form to get in touch with us.</p>
                    <p className="para">We look forward to hearing from you!</p>
                    <p className="para">Emergency? Call Us:</p>
                    <i class="fa-solid fa-phone-volume"></i><span className="personal-det">+91 938953XXXX</span>
                    <p className="para">Send us mail</p>
                    <i class="fa-solid fa-envelope"></i>
                    <span className="personal-det">abc@domain.com</span>
                </div>
            </div>
            <div className="form">
                <ContactForm />
            </div>
        </div>
    )
}