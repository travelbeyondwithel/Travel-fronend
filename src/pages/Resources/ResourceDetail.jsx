import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaArrowUpRightFromSquare,
    FaLink,
    FaEnvelope,
    FaFacebook,
    FaGlobe,
    FaInstagram,
    FaLocationDot,
    FaPhone,
} from "react-icons/fa6";

import { getResource } from "../../api/resourcesAPI";
import { getMediaUrl } from "../../utils/mediaUrl";

import "../../styles/ResourceDetail.css";

export default function ResourceDetail() {
    const { slug } = useParams();

    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /* =====================================================
        LOAD RESOURCE
    ===================================================== */

    useEffect(() => {
        let mounted = true;

        const fetchResource = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getResource(slug);

                if (mounted) {
                    setResource(response.data);
                }
            } catch (err) {
                console.error(
                    "Failed to load travel resource:",
                    err
                );

                if (mounted) {
                    setError(
                        "We couldn't load this travel resource right now."
                    );
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        if (slug) {
            fetchResource();
        }

        return () => {
            mounted = false;
        };
    }, [slug]);

    /* =====================================================
        LOADING
    ===================================================== */

    if (loading) {
        return (
            <main className="resource-detail">
                <div className="resource-detail__state">
                    <p>Loading travel resource...</p>
                </div>
            </main>
        );
    }

    /* =====================================================
        ERROR
    ===================================================== */

    if (error || !resource) {
        return (
            <main className="resource-detail">
                <div className="resource-detail__state resource-detail__state--error">
                    <p>
                        {error || "Travel resource not found."}
                    </p>
                </div>
            </main>
        );
    }

    /* =====================================================
        PARTNER
    ===================================================== */

    const partner = resource.partner || null;

    /* =====================================================
        BUSINESS INFORMATION
    ===================================================== */

    const businessName =
        partner?.business_name ||
        resource.title ||
        "Travel Resource";

    const businessType =
        partner?.business_type ||
        resource.category_display ||
        resource.category?.replaceAll("_", " ") ||
        "Travel";

    const location = partner?.location || "";
    const country = partner?.country || "";

    const description =
        resource.description ||
        partner?.description ||
        "";

    /* =====================================================
        IMAGE
    ===================================================== */

    const imageUrl = resource.image
        ? getMediaUrl(resource.image)
        : partner?.main_image
            ? getMediaUrl(partner.main_image)
            : null;

    /* =====================================================
        WEBSITE
    ===================================================== */

    const websiteUrl =
        partner?.website_url ||
        resource.external_url ||
        null;

    /* =====================================================
        BOOKING
    ===================================================== */

    const bookingUrl =
        partner?.booking_url ||
        null;

    /* =====================================================
        CATEGORY LABEL
    ===================================================== */

    const categoryLabel =
        resource.category_display ||
        resource.category?.replaceAll("_", " ") ||
        businessType ||
        "Travel";

    /* =====================================================
        PAGE
    ===================================================== */

    return (
        <main className="resource-detail">

            {/* =================================================
                HERO IMAGE
            ================================================= */}

            <section className="resource-detail__hero">

                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={businessName}
                        className="resource-detail__hero-image"
                    />
                ) : (
                    <div className="resource-detail__hero-placeholder">
                        <span>
                            {categoryLabel}
                        </span>
                    </div>
                )}

            </section>

            {/* =================================================
                CONTENT
            ================================================= */}

            <section className="resource-detail__content">

                {/* =================================================
                    HEADER
                ================================================= */}

                <header className="resource-detail__header">

                    <span className="resource-detail__category">
                        {categoryLabel}
                    </span>

                    <h1>
                        {businessName}
                    </h1>

                    {/* LOCATION */}

                    {(location || country) && (
                        <div className="resource-detail__location">

                            <FaLocationDot />

                            <span>
                                {location}

                                {location && country
                                    ? ", "
                                    : ""}

                                {country}
                            </span>

                        </div>
                    )}

                </header>

                {/* =================================================
                    CONTACT INFORMATION
                ================================================= */}

                {(partner?.phone ||
                    partner?.email ||
                    websiteUrl ||
                    partner?.instagram_url ||
                    partner?.facebook_url) && (

                    <div className="resource-detail__contact">

                        {/* PHONE */}

                        {partner?.phone && (
                            <a
                                href={`tel:${partner.phone}`}
                                className="resource-detail__contact-item"
                            >
                                <FaPhone />

                                <span>
                                    {partner.phone}
                                </span>
                            </a>
                        )}

                        {/* EMAIL */}

                        {partner?.email && (
                            <a
                                href={`mailto:${partner.email}`}
                                className="resource-detail__contact-item"
                            >
                                <FaEnvelope />

                                <span>
                                    {partner.email}
                                </span>
                            </a>
                        )}

                        {/* WEBSITE */}

                        {websiteUrl && (
                            <a
                                href={websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="resource-detail__contact-item"
                            >
                                <FaGlobe />

                                <span>
                                    Website
                                </span>
                            </a>
                        )}

                        {/* INSTAGRAM */}

                        {partner?.instagram_url && (
                            <a
                                href={partner.instagram_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="resource-detail__contact-item"
                            >
                                <FaInstagram />

                                <span>
                                    Instagram
                                </span>
                            </a>
                        )}

                        {/* FACEBOOK */}

                        {partner?.facebook_url && (
                            <a
                                href={partner.facebook_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="resource-detail__contact-item"
                            >
                                <FaFacebook />

                                <span>
                                    Facebook
                                </span>
                            </a>
                        )}

                    </div>
                )}

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                {description && (
                    <div className="resource-detail__description">

                        <p>
                            {description}
                        </p>

                    </div>
                )}

                {/* =================================================
                    BOOKING
                ================================================= */}

                {bookingUrl && (
                    <a
                        href={bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resource-detail__booking"
                    >
                        Book / Reserve

                        <FaArrowUpRightFromSquare />
                    </a>
                )}

                {/* =================================================
                    MAIN WEBSITE / VIEW
                ================================================= */}

                {/* {websiteUrl && (
                    <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resource-detail__view"
                    >
                        Visit Website

                        <FaLink />
                    </a>
                )} */}

                {/* =================================================
                    BACK
                ================================================= */}

                <Link
                    to="/resources"
                    className="resource-detail__back"
                >
                    <FaArrowLeft />

                    <span>
                        Back to Travel Resources
                    </span>
                </Link>

            </section>

        </main>
    );
}