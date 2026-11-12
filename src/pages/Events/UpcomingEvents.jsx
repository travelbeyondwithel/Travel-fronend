import React from "react";
import { Link } from "react-router-dom";
import "../../styles/UpcomingEvents.css";

const UpcomingEvents = ({ event }) => {
    if (!event) {
        return null;
    }

    const formatDate = (dateString) => {
        if (!dateString) return "";

        const date = new Date(dateString);

        return date.toLocaleDateString("en-ZA", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // const imageUrl = event.hero_image
    //     ? event.hero_image.startsWith("http")
    //         ? event.hero_image
    //         : `http://127.0.0.1:8000${event.hero_image}`
    //     : "/images/event-placeholder.jpg";

    return (
        <section className="upcoming-event">
            <div
                className="upcoming-event__background"
                // style={{
                //     backgroundImage: `url(${event.hero_image})`,
                // }}
            >
                <div className="upcoming-event__overlay"></div>

                <div className="upcoming-event__content">
                    <span className="upcoming-event__label">
                        Upcoming Event
                    </span>

                    <h2>{event.title}</h2>

                    {event.introduction && (
                        <p className="upcoming-event__intro">
                            {event.introduction}
                        </p>
                    )}

                    <div className="upcoming-event__details">
                        {event.event_date && (
                            <div className="upcoming-event__detail">
                                <span className="detail-icon">📅</span>
                                <span>{formatDate(event.event_date)}</span>
                            </div>
                        )}
                        {/* formatDate */}

                        {event.venue && (
                            <div className="upcoming-event__detail">
                                <span className="detail-icon">📍</span>
                                <span>{event.venue}</span>
                            </div>
                        )}

                        {event.location && (
                            <div className="upcoming-event__detail">
                                <span className="detail-icon">🌍</span>
                                <span>{event.location}</span>
                            </div>
                        )}

                        {event.ticket_price && (
                            <div className="upcoming-event__detail">
                                <span className="detail-icon">🎟️</span>
                                <span>
                                    R{Number(event.ticket_price).toFixed(2)}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="upcoming-event__actions">
                        {event.ticket_url ? (
                            <a
                                href={event.ticket_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="upcoming-event__button"
                            >
                                Get Tickets
                            </a>
                        ) : (
                            <Link
                                to={`/events/${event.slug}`}
                                className="upcoming-event__button"
                            >
                                View Event
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;

// import React from "react";
// import '../../styles/UpcomingEvents.css';

// // const UpcomingEvents = ({ event})