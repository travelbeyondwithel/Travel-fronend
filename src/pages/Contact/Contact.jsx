import { useEffect, useState } from "react";
import "../../styles/Contact.css";
import { Link } from "react-router-dom";
import { getContact, getProfile } from '../../api/articleApi';
import {
    FaFacebookF, 
    FaInstagram, 
    FaLinkedinIn, 
    FaPaperPlane, 
    FaPinterestP,
} from "react-icons/fa6";

function Contact() {
    const [contact, setContact] = useState(null);
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    useEffect(() => { 
        const fetchContact = async () => { 
            try { 
                const response = await getContact();
                setContact(response.data); 
            } catch (error) { 
                console.error("Error fetching contact information:", error); 
                setError(true); 
            } finally { 
                setLoading(false); 
            } 
        }; 
        
        fetchContact(); 
    }, []);

    useEffect(() => { 
        const fetchProfile = async () => { 
            try { 
                const response = await getProfile(); 
                setProfile(response.data); 
            } catch (error) { 
                console.error("Error fetching profile:", error); 
                setError(true);
            } finally { 
                setLoading(false); 
            } 
        }; 
        
        fetchProfile(); 
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

    setFormData((previous) => ({
        ...previous,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Contact form:", formData);

        alert("Thank you for contacting Beyond the Horizon!");

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    };

    if (loading) { 
        return ( 
            <main className="contact-page"> 
                <section className="contact-hero"> 
                    <div className="contact-hero-overlay"> 
                        <div className="contact-hero-content"> 
                            <span className="contact-eyebrow"> 
                                Contact Us
                            </span> 
                            
                            <p>Loading...</p> 
                            
                        </div> 
                    </div> 
                </section> 
            </main> 
        ); 
    }
    
    if (error || !contact) { 
        return ( 
            <main className="contact-page"> 
                <section className="contact-hero"> 
                    <div className="contact-hero-overlay"> 
                        <div className="contact-hero-content"> 
                            <span className="contact-eyebrow"> 
                                Travel Beyond with El
                            </span> 
                            
                            <h1>Contact Us</h1> 
                            
                            <p>
                                We're currently unable to load our contact information. Please try again later. 
                            </p> 
                        </div> 
                    </div> 
                </section> 
            </main> 
        ); 
    }

    return ( 
        <main className="contact-page"> 

        <header className="contact-profile">

            {/* Hero */} 
            <section className="contact-hero"> 
                <div className="contact-hero-overlay"> 
                    <div className="contact-hero-content"> 
                        <span className="contact-hero-eyebrow"> 
                            {contact.title || "Contact Us"} 
                        </span>
                        {contact.introduction && (
                            <div 
                                className="article-introduction"
                                dangerouslySetInnerHTML={{
                                    __html: contact.introduction
                                }}
                            />
                        )}
                    </div> 
                </div> 
            </section>


            <section className="profile"> 
            
                {/* Profile photo & Name */}
                <div className="side_by_side">
                {/* Profile photo */}
                    {profile.photo && ( 
                        <div className="profile-image-wrapper"> 
                            <img 
                                src={profile.photo} 
                                alt={profile.name} 
                                className="profile-image" 
                            /> 
                        </div>
                    )} 
                    <div className="profile-wrapper">
                        {profile.name && ( 
                            <h2 className="profile-name"> 
                                Meet {profile.name} 
                            </h2> 
                        )} 
                        
                        {profile.role && ( 
                            <p className="profile-role"> 
                                {profile.role} 
                            </p> 
                        )} 
                    </div>
                </div> 
                
                {/* Profile information */} 
                <div className="profile-content"> 
                    
                    {profile.tagline && ( 
                        <p className="profile-tagline"> 
                            {profile.tagline} 
                        </p> 
                    )} 

                    {profile.bio && ( 
                        <p className="profile-bio"> 
                            {profile.bio} 
                        </p> 
                    )} 

                <Link
                    to={'about/'}
                    className="profile-read-more"
                >
                    Read More
                </Link>
                    
                    {/* Social links */} 
                    <div className="profile-socials"> 
                        {profile.facebook && ( 
                            <a 
                                href={profile.facebook} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="Facebook" 
                            > 
                                <FaFacebookF />
                            </a> 
                        )} 
                        
                        {profile.instagram && ( 
                            <a 
                                href={profile.instagram} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="Instagram" 
                            > 
                                <FaInstagram />
                            </a> 
                        )} 
                        
                        {profile.pinterest && ( 
                            <a 
                                href={profile.pinterest}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="pinterest" 
                            > 
                                <FaPinterestP />
                            </a> 
                        )} 

                        {profile.linkedin && ( 
                            <a 
                                href={profile.linkedin}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="LinkedIn" 
                            > 
                                <FaLinkedinIn /> 
                            </a> 
                        )} 
                    </div> 
                </div> 
            </section> 
        </header>
        

            {/* Bottom CTA */}
            <section className="contact-bottom"> 
                <span className="contact-eyebrow"> 
                    HAVE A STORY TO SHARE? 
                </span> 
                
                <h2> 
                    Your experience could inspire someone else's journey. 
                </h2> 
                
                <p> 
                    Get in touch and tell us about a destination, event or experience you think deserves to be discovered.
                </p> 
            </section> 
            
            {/* Contact section */} 
            <section className="contact-section"> 
                <div className="contact-info"> 
                    <span className="contact-header-eyebrow"> 
                        GET IN TOUCH 
                    </span> 
                    
                    <h2> 
                        Let's start a conversation. 
                    </h2> 
                    
                    <p> 
                        Whether you have a question about an article, 
                        want to suggest a destination or would like to work with us, feel free to reach out. 
                    </p> 
                    
                    <div className="contact-details">
                        {/* Email */} 
                        {contact.email && ( 
                            <div className="contact-detail"> 
                                <span className="contact-detail-icon"> 
                                    ✉ 
                                </span> 
                                
                                <div> 
                                    <h3>Email:</h3> 
                                    
                                    <p> 
                                        <a 
                                            href={`mailto:${contact.email}`} 
                                        > 
                                            {contact.email} 
                                        </a> 
                                    </p> 
                                </div> 
                            </div> 
                        )} 
                        
                        {/* Phone */} 
                        {contact.phone && ( 
                            <div className="contact-detail"> 
                                <span className="contact-detail-icon"> 
                                    ☎ 
                                </span>
                                
                                <div> 
                                    <h3>Phone:</h3> 
                                    
                                    <p> 
                                        <a 
                                            href={`tel:${contact.phone}`} 
                                        > 
                                            {contact.phone} 
                                        </a> 
                                    </p> 
                                </div> 
                            </div> 
                        )} 
                        
                        {/* Address */} 
                        {contact.address && ( 
                            <div className="contact-detail"> 
                                <span className="contact-detail-icon"> 
                                    📍 
                                </span> 
                                <div> 
                                <h3>Location:</h3> 
                                
                                <p> 
                                    <a>
                                        {contact.address} 
                                    </a>
                                </p> 
                            </div> 
                        </div> 
                    )} 
                </div> 
            

                {/* Social links */} 
            <div className="social-links">
                {(contact.facebook || 
                    contact.instagram || 
                    contact.linkedin) && ( 
                        <div className="contact-socials"> 
                            {contact.facebook && ( 
                                <a 
                                    href={contact.facebook}
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                > 
                                    <FaFacebookF />
                                </a> 
                            )} 
                            
                            {contact.instagram && ( 
                                <a 
                                    href={contact.instagram} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                >
                                    <FaInstagram />
                                </a> 
                            )} 
                            
                            {contact.linkedin && ( 
                                <a 
                                    href={contact.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                > 
                                    <FaLinkedinIn />
                                </a> 
                            )} 
                        </div> 
                    )} 
            </div>
            </div> 
                {/* Form */}
                <div className="contact-form-wrapper"> 
                    <form 
                        className="contact-form" 
                        onSubmit={handleSubmit} 
                    > 
                    
                    <div className="contact-form-row"> 
                        <div className="form-group"> 
                            <label htmlFor="name"> 
                                Name 
                            </label> 
                            
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                placeholder="Your name" 
                                required 
                            /> 
                        </div> 
                        
                        <div className="form-group"> 
                            <label htmlFor="email"> 
                                Email 
                            </label> 
                            
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder="Your email" 
                                required 
                            /> 
                        </div> 
                    </div> 
                    
                    <div className="form-group"> 
                        <label htmlFor="subject"> 
                            Subject 
                        </label> 
                        
                        <input 
                            type="text" 
                            id="subject" 
                            name="subject" 
                            value={formData.subject} 
                            onChange={handleChange} 
                            placeholder="What would you like to talk about?" 
                            required 
                        /> 
                    </div> 
                    
                    <div className="form-group"> 
                        <label htmlFor="message"> 
                            Message 
                        </label> 
                        
                        <textarea
                            id="message" 
                            name="message" 
                            value={formData.message} 
                            onChange={handleChange} 
                            placeholder="Tell us what's on your mind..." 
                            rows="7" 
                            required 
                        /> 
                    </div> 
                    
                    {/* <button 
                        type="submit" 
                        className="contact-submit" 
                    > 
                        Send Message
                    </button>  */}
                    
                    <button type='submit' disabled={loading} className="contact-submit" >
                        <FaPaperPlane />

                        {loading
                            ? 'Send...'
                            : 'Send Message'
                        }
                        
                    </button>
                </form> 
            </div> 
        </section> 
        
        </main> 
    ); 
} 

export default Contact; 