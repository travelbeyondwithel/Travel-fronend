import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

import "../../styles/Destinations.css";

import { getDestinationDirectory } from "../../api/articleApi";
import { getMediaUrl } from "../../utils/mediaUrl";

function Destinations() {

    const [destinations, setDestinations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        async function fetchDestinations() {

            try {

                setLoading(true);
                setError(null);

                const response =
                    await getDestinationDirectory();

                setDestinations(response.data);

            }

            catch (err) {

                console.error(
                    "Error loading destination directory:",
                    err
                );

                setError(
                    "Unable to load destinations."
                );

            }

            finally {

                setLoading(false);

            }

        }

        fetchDestinations();

    }, []);

    if (loading) {

        return (
            <p>
                Loading destinations...
            </p>
        );

    }

    if (error) {

        return (
            <p>
                {error}
            </p>
        );

    }


    return (
        <main className="destinations-page">
        {/* Hero */}

        {/* Intro */}
        <section className="destinations-intro">
            <span className="destinations-eyebrow">
                EXPLORE
            </span>

            <h1>Where will you go next?</h1>

            <p>
            Explore destinations, discover unique experiences, and find
            inspiration for your next adventure.
            </p>

        </section>

        <section className="destinations-directory">

            {destinations.length > 0 ? (

                destinations.map((continent) => (

                    <section
                        className="continent-section"
                        key={continent.id}
                    >

                        {/* CONTINENT */}

                        <h2 className="continent-title">
                            {continent.name}
                        </h2>

                        {/* COUNTRIES */}

                        <div className="country-grid">

                            {continent.countries &&
                            continent.countries.length > 0 ? (

                                continent.countries.map(
                                    (country) => (

                                        <Link
                                            key={country.id}
                                            to={`/articles/${country.slug}`}
                                            className="country-card"
                                        >

                                            <div className="country-image">

                                                <img
                                                    src={getMediaUrl(
                                                        country.image
                                                    )}
                                                    alt={
                                                        country.title
                                                    }
                                                />

                                                <div className="country-overlay">

                                                    <h3>
                                                        {
                                                            country.title
                                                        }
                                                    </h3>

                                                </div>

                                            </div>

                                        </Link>

                                    )
                                )

                            ) : (

                                <p className="no-countries">
                                    No destinations available yet.
                                </p>

                            )}

                        </div>

                    </section>

                ))

            ) : (

                <div className="empty-destinations">

                    <h3>
                        No destinations yet
                    </h3>

                    <p>
                        New destinations are coming soon.
                        Check back again.
                    </p>

                </div>

            )}

        </section>

        {/* =================================
            CTA
        ================================= */}

        <section className="destinations-cta">

            <div>

                <span className="destinations-eyebrow">
                    KEEP EXPLORING
                </span>

                <h2>
                    There is always more
                    beyond just Traveling.
                </h2>

                {/* <p>
                    Discover stories, experiences and
                    events that can inspire your next journey.
                </p> */}

                <Link
                    to="/travel-guide"
                    className="destinations-cta-button"
                >
                    Explore the travel guide <FaAngleRight />
                </Link>

            </div>

        </section>

    </main>

    );

}

export default Destinations;