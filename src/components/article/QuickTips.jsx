import '../../styles/QuickTips.css';

import { FaCircleCheck } from "react-icons/fa6";


function QuickTips({ tips }) {

    if (!tips?.length) return null;

    return (

        <section className="quick-tips">

            <div className="quick-header">

                <h2>
                    Quick Tips
                </h2>

                <p>
                    Helpful information before your trip.
                </p>

            </div>

            <div className="tips-grid">

                {tips.map((tip)=>(

                    <div className="tip-card" key={tip.id}>


                        <div>

                            <div className="tip-content">

                                <FaCircleCheck className="tip-icon"/>

                                <h3>
                                    {tip.title}
                                </h3>
                            </div>

                            <div className="tip-content">
                                <span className="none-icon"/>
                                {tip.value && (
                                    <li>
                                        {tip.value}
                                    </li>
                                )}
                            </div>

                        </div>

                    </div>                    

                ))}

            </div>

        </section>
    );
}

export default QuickTips;