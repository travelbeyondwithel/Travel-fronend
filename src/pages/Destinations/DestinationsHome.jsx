import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/DestinationHome.css';
import { getMediaUrl } from '../../utils/mediaUrl';

function DestinationsHome() {

    

    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch('http://127.0.0.1:8000/api/destinations/')
            .then(response => response.json())
            .then(data => {
                setDestinations(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching destinations:', error);
                setLoading(false);
            });

    }, []);

    if (loading) {
        return null;
    }

    return (

        <section className="destinations-home">

            <div className="destinations-home-header">

                <div>
                    <span className="destination-label">
                        EXPLORE Destinations                        
                    </span>

                    {/* <h2>
                    </h2>

                    <p>
                        Discover places worth experiencing.
                    </p> */}
                </div>

                {/* <Link to="/destinations">
                    Explore all destinations
                </Link> */}

            </div>

            <div className="destinations-home-grid">

                {destinations.slice(0, 4).map((destination) => (

                    <Link
                        to="/articles/south-africa"
                        key={destination.id}
                        className="destination-card"
                    >

                        <img
                            src={getMediaUrl(destination.hero_image)}
                            alt={destination.title}
                        />

                        <div className="destination-card-overlay">

                            <h3>
                                {destination.title}
                            </h3>

                        </div>

                    </Link>

                ))}

            </div>

        </section>
    );
}

export default DestinationsHome;