import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvent } from "../../api/articleApi";
import "../../styles/EventDetail.css";

const EventDetail = () => {
    const { slug } = useParams();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getEvent(slug);

                setEvent(response.data);

            } catch (err) {
                console.error("Failed to load event:", err);

                setError(
                    "We couldn't find this event."
                );

            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchEvent();
        }

    }, [slug]);

    // ==========================
    // LOADING
    // ==========================

    if (loading) {
        return (
            <main className="event-detail-page">
                <div className="event-detail-status">
                    <p>Loading event...</p>
                </div>
            </main>
        );
    }

    // ==========================
    // ERROR
    // ==========================

    if (error || !event) {
        return (
            <main className="event-detail-page">
                <div className="event-detail-status">

                    <h2>Event not found</h2>

                    <p>
                        This event may have been removed
                        or is no longer available.
                    </p>

                    <Link
                        to="/events"
                        className="back-to-events"
                    >
                        ← Back to Events
                    </Link>

                </div>
            </main>
        );
    }

    // ==========================
    // DATE
    // ==========================

    const formattedDate = event.event_date
        ? new Date(
            event.event_date
        ).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : null;

    return (
        <main className="event-detail-page">

            {/* ==========================
                HERO
            ========================== */}

            <section className="event-detail-hero">

                {event.hero_image && (
                    <img
                        src={event.hero_image}
                        alt={
                            event.hero_image_alt ||
                            event.title
                        }
                        className="event-detail-image"
                    />
                )}

                <div className="event-detail-overlay">

                    <div className="event-detail-hero-content">

                        {event.category && (
                            <span className="event-category">
                                {event.category}
                            </span>
                        )}

                        <h1>{event.title}</h1>

                        {event.subtitle && (
                            <p className="event-subtitle">
                                {event.subtitle}
                            </p>
                        )}

                    </div>

                </div>

            </section>

            {/* ==========================
                EVENT CONTENT
            ========================== */}

            <section className="event-detail-content">

                <div className="event-detail-main">

                    {/* Event information */}

                    <div className="event-info">

                        {formattedDate && (
                            <div className="event-info-item">

                                <span className="event-info-icon">
                                    📅
                                </span>

                                <div>
                                    <small>Date</small>
                                    <strong>
                                        {formattedDate}
                                    </strong>
                                </div>

                            </div>
                        )}

                        {event.event_time && (
                            <div className="event-info-item">

                                <span className="event-info-icon">
                                    🕒
                                </span>

                                <div>
                                    <small>Time</small>
                                    <strong>
                                        {event.start_time}
                                    </strong>
                                </div>

                            </div>
                        )}

                        {event.venue && (
                            <div className="event-info-item">

                                <span className="event-info-icon">
                                    📍
                                </span>

                                <div>
                                    <small>Venue</small>
                                    <strong>
                                        {event.venue}
                                    </strong>
                                </div>

                            </div>
                        )}

                        {event.location && (
                            <div className="event-info-item">

                                <span className="event-info-icon">
                                    🌍
                                </span>

                                <div>
                                    <small>Location</small>
                                    <strong>
                                        {event.location}
                                    </strong>
                                </div>

                            </div>
                        )}

                    </div>

                    {/* Introduction */}

                    {event.introduction && (
                        <div className="event-introduction">

                            <p>
                                {event.introduction}
                            </p>

                        </div>
                    )}

                    {/* Main content */}

                    {event.content && (
                        <div
                            className="event-content"
                            dangerouslySetInnerHTML={{
                                __html: event.content,
                            }}
                        />
                    )}

                </div>

                {/* ==========================
                    SIDEBAR
                ========================== */}

                <aside className="event-detail-sidebar">

                    <div className="event-ticket-card">

                        <h3>
                            Ready to experience it?
                        </h3>

                        <p>
                            Get your tickets and don't
                            miss this event.
                        </p>

                        {event.ticket_url ? (
                            <a
                                href={event.ticket_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="event-ticket-button"
                            >
                                Get Tickets →
                            </a>
                        ) : (
                            <p className="ticket-unavailable">
                                <span className="detail-icon">🎟️</span>
                                <span>
                                    R{Number(event.ticket_price).toFixed(2)}
                                </span>
                            </p>
                        )}

                    </div>

                </aside>

            </section>

            {/* ==========================
                BACK TO EVENTS
            ========================== */}

            <section className="event-detail-footer">

                <Link
                    to="/events"
                    className="back-to-events"
                >
                    ← Explore More Events
                </Link>

            </section>

        </main>
    );
};

export default EventDetail;