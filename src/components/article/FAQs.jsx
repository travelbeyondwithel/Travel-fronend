import { useState } from "react";
import '../../styles/FAQs.css'

import {
    FaPlus,
    FaMinus,
} from 'react-icons/fa6'


function FAQs({ faqs }) {

    const [active, setActive] = useState(null);

    if(!faqs?.length) return null;

    const toggleFAQ = (id)=>{
        if(active===id){
            setActive(null);
        }else{
            setActive(id)
        }
    };


    return (

        <section className="faqs">

            <div className="faq-content">

                <div className="faq-header">

                    <h2>Frequently Asked Questions</h2>

                    {/* <p>
                        Everything you need to know before your trip.
                    </p> */}

                </div>

                <div className="faq-list">

                    {faqs.map((faq)=>(

                    <div key={faq.id} className="faq-item">

                        <button className="faq-question" onClick={()=>toggleFAQ(faq.id)}>
                            
                            <span>
                                {faq.question}
                            </span>

                            {
                                active===faq.id

                                ?

                                <FaMinus />

                                :

                                <FaPlus />
                            }

                        </button>

                        {
                            active===faq.id && (

                                <div className="faq-answer">

                                    <p>
                                        {faq.answer}
                                    </p>

                                </div>
                            )

                        }
                    </div>

                    ))}

                </div>
            </div>

        </section>
    );
}

export default FAQs;