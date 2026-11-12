import { FaCopyright } from "react-icons/fa6";
import '../../styles/Footer.css';
import { Link } from "react-router-dom";



function Footer() {
    const year = new Date().getFullYear();

    return (

        <footer className="footer">
            {/* <div className="footer-container">

                <div className="footer-column">
                    <h2 className="footer-logo">Travel Beyond with El</h2>
                    <p>
                        Discover incredible destinations, unforgettable experiences,
                        inspiring travel stories, and exciting events from around the world.
                    </p>
                </div>

            </div> */}
            <div className="footer-links">
                <Link to="/partner-with-us">Partner with Us</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms-and-disclaimers">Terms and Disclaimers</Link>
            </div>

            <div className="footer-bottom">
                <FaCopyright/> {year} Travel Beyond with El. All Rights Reserved
            </div>
        </footer>
    );
}

export default Footer;