import { FaMugHot, FaPaypal } from "react-icons/fa6";



import '../../styles/BuyMeACoffee.css';
import { useEffect, useState } from "react";

function BuyMeACoffee() {

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        // Check if the visitor has already seen the automatic message
        const hasSeenMessage = localStorage.getItem('buyMeACoffeeSeen')

        if (!hasSeenMessage) {
            // Open automatically for first-time visitors
            setExpanded(true);

            //  Keep it open for 2 minutes
            const timer = setTimeout(() => {
                setExpanded(false);

                // Remember that the visitor has seen it
                localStorage.setItem('buMeACoffeeSeen', 'true');
            }, 1 * 60 * 1000);
        }
    }, []);

    const handleMouseEnter = () => {
        setExpanded(true);
    };

    const handleMouseLeave = () => {
        setExpanded(false);
    };

    return (

        <a 
            href="http://www.paypal.me/EliasLang"
            target="_blank"
            rel="noopener noreferrer"
            className={`buy-coffee ${expanded ? 'expanded' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="Buy me a coffee"
        >
            <span className="coffee-icon">
                {expanded ? <FaPaypal /> : <FaMugHot />}
            </span>

            <span className="coffee-text">
                Buy me a coffee
            </span>

        </a>
        // <section className="buy-coffee">
        //     <div className="coffee">

        //         <div className="buy-coffee-icon">
        //             <FaMugHot />
        //         </div>

        //         <div className="buy-coffee-content">
        //             <h3>Enjoyed this Article?</h3>

        //             <p>
        //                 If this article helped you discover something new,
        //                 consider buying us a coffee. Your support helps us keep
        //                 exploring, researching and sharing more experiences with you.
        //             </p>

        //             <a 
        //                 href="http://www.paypal.me/EliasLang"
        //                 target='_blank'
        //                 rel='noopener noreferrer'
        //                 className='buy-coffee-button'
        //             >
        //                 <span className="coffee-icon">
        //                     <FaMugHot />
        //                 </span>
        //                 Buy us a coffee
        //                 <span className="paypal">
        //                     <FaPaypal />
        //                 </span>
        //             </a>
        //         </div>
        //     </div>
        // </section>
    );
}

export default BuyMeACoffee;