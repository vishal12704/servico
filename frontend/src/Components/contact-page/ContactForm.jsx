import "./css_files/ContactForm.css";
export default function ContactForm(){
    return(
        <div className="contact-form">
            <form className="email-form" method="Post">
                <input className="form-input" type="text" placeholder="First Name" required/>
                <input className="form-input" type="text" placeholder="Last Name" required/>
                <input className="form-input" type="email" placeholder="Your Email" required/>
                <input className="form-input" type="phone" placeholder="Your Phone" required/>
                <input className="form-input" type="text" placeholder="Subject" required/>
                <textarea placeholder="Your Message" cols="30" rows="6"></textarea>
                <input className="button" type="submit" placeholder="Send Message" />
            </form>
        </div>
    )
}