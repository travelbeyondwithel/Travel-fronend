import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaBars, 
    FaX,
    FaInstagram,
    FaYoutube,
    FaTiktok,
    FaXTwitter, 
} from 'react-icons/fa6';

import '../../styles/MobileMenu.css';

// FaTimes

function MobileMenu() {

    const [ isOpen, SetIsOpen] = useState(false);

    const [openCategory, setOpenCategory] = useState(null)

    const toggleMenu = () => {
            SetIsOpen(prev =>   !prev);
    };

    // const toggleCategory = (category) => {
    //     setOpenCategory((prev) =>
    //     prev === category ? null : category
    //     );
    // };

    return (
        <div className='mobile'>
            <button 
                className='mobile-menu-button'
                onClick={toggleMenu}
                aria-label={
                    isOpen
                        ? 'Close menu'
                        : 'open menu'
                }
                aria-expanded={isOpen}
            >
                {isOpen ? <FaX  /> : <FaBars />}
                <span>Menu</span>
            </button>
            

            {isOpen && (
                <section 
                    className={`mobile-menu ${
                        isOpen ? 'open' : ''
                    }`} 
                >

                    <div className='mobile-nav'>

                        <Link
                            to='/'
                            className='mobile-menu-link'
                            onClick={() => SetIsOpen(false)}
                        >
                            Home
                        </Link>

                        <Link
                            to='/blog'
                            className='mobile-menu-link'
                            onClick={() => SetIsOpen(false)}
                        >
                            Blog
                        </Link>

                        <Link
                            to='/travel-guide'
                            className='mobile-menu-link'
                            onClick={() => SetIsOpen(false)}
                        >
                            Travel Guides
                        </Link>

                        <Link
                            to='/resources'
                            className='mobile-menu-link'
                            onClick={() => SetIsOpen(false)}
                        >
                            Travel Resources
                        </Link>

                        <Link
                            to='/destinations'
                            className='mobile-menu-link'
                            onClick={() => SetIsOpen(false)}
                        >
                            Destinations
                        </Link>

                        <Link
                            to='/events'
                            className='mobile-menu-link'
                            onClick={() => SetIsOpen(false)}
                        >
                            Events
                        </Link>


                        <Link
                            to='/about'
                            className='mobile-menu-link'
                            onClick={() => SetIsOpen(false)}
                        >
                            About
                        </Link>

                        <Link
                            to='/contact'
                            className='mobile-menu-link'
                            onClick={() => SetIsOpen(false)}
                        >
                            Contact
                        </Link>

                        {/* SOCIAL MEDIA */}
                        <div className="mobile-socials">

                            <a href="#" aria-label="Instagram">
                                <FaInstagram />
                            </a>

                            <a href="#" aria-label="YouTube">
                                <FaYoutube />
                            </a>

                            <a href="#" aria-label="TikTok">
                                <FaTiktok />
                            </a>

                            <a href="#" aria-label="X">
                                <FaXTwitter />
                            </a>

                        </div>

                    </div>

                </section>
            )}
        </div>
    );
}

export default MobileMenu;

