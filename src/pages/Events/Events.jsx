import '../../styles/Events.css';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa6';

import useArticles from '../../hooks/useArticles';
import { getMediaUrl } from "../../utils/mediaUrl";
import Profile from '../../components/article/Profile';

function Events() {

    const {

        events,

        loading,

        error

    } = useArticles();

    return (
        <main className="events-page">

            {/* Events Hero */}
            <section className="events-hero">

                    <div className="events-hero-content">

                        <span className="events-eyebrow">
                            Explore
                        </span>

                        <h1>
                            Discover What's Happening
                        </h1>

                        <p>
                            Discover unforgettable events, festivals,
                            music, culture and experiences happening
                            across incredible destinations.
                        </p>

                    </div>

            </section>

            {/* Upcoming Events */}
            <section className="events-section">

                <div className="events-header">

                    <h2>
                        Upcoming Events
                    </h2>

                    <p>
                        Find something worth experiencing.
                    </p>

                </div>
            

                    
                <div className="events-grid">
                        
                {events.length > 0 ? (
                    events.map((event) => {

                        const formattedDate = new Date(
                                event.event_date
                            ).toLocaleDateString(
                                'en-ZA',
                                {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                }
                            );

                        return (

                    <article 
                        className="event-card" 
                        key={event.id}
                    >

                        <div className="event-image">

                            <img
                                src={getMediaUrl(event.hero_image)}
                                alt={event.title}
                            />

                            <span className="event-category">
                                {event.category}{/* Music */}
                            </span>

                        </div>

                        <div className="event-content">


                            <span className="event-date">
                                {formattedDate}{/* 15 September 2026 */}
                            </span>

                            <h3>
                                {event.title}{/* Event Name Goes Here */}
                            </h3>

                            <p>
                                {event.introduction}
                                {/* Discover an unforgettable experience
                                filled with music, people and amazing
                                moments. */}
                            </p>

                            <Link
                                to={`${event.slug}`}
                                className="event-link"
                            >
                                View Event <FaAngleRight />
                            </Link>

                        </div>

                    </article>
                        );
                    })
                    ) : (
                        <div className="no-events">
                            <h3>No events yet</h3>
                            <p>
                                New events are coming soon. Check back again.
                            </p>
                        </div>
                    )}

                </div>

            </section>

            {/* Explore Event Categories */}
            <section className="event-categories">

                <div className="events-header">

                    <h2>
                        Explore Events
                    </h2>

                    <p>
                        Find experiences that match your interests.
                    </p>

                </div>

                <div className="event-category-grid">

                    <Link to="/events/music">
                        Music
                    </Link>

                    <Link to="/events/festivals">
                        Festivals
                    </Link>

                    <Link to="/events/food">
                        Food & Lifestyle
                    </Link>

                    <Link to="/events/culture">
                        Culture
                    </Link>

                </div>

            </section>


        </main>
    );
}

export default Events;