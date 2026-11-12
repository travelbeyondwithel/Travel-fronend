import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import { getResources } from "../../api/resourcesAPI";
import { getMediaUrl } from "../../utils/mediaUrl";
import { truncateText } from "../../utils/truncate";

import "../../styles/Resources.css";

export default function Resources() {
    const [resources, setResources] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;

        const fetchResources = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getResources();

                if (mounted) {
                    setResources(response.data || []);
                }
            } catch (err) {
                console.error(
                    "Failed to load travel resources:",
                    err
                );

                if (mounted) {
                    setError(
                        "We couldn't load the travel resources right now."
                    );
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchResources();

        return () => {
            mounted = false;
        };
    }, []);

    /* =========================================================
       CATEGORIES
    ========================================================= */

    const categories = useMemo(() => {
        const categoryMap = new Map();

        resources.forEach((resource) => {
            if (!categoryMap.has(resource.category)) {
                categoryMap.set(
                    resource.category,
                    resource.category_display ||
                        resource.category
                );
            }
        });

        return Array.from(categoryMap.entries()).map(
            ([value, label]) => ({
                value,
                label,
            })
        );
    }, [resources]);

    /* =========================================================
       FEATURED RESOURCES
    ========================================================= */

    const featuredResources = useMemo(() => {
        return resources.filter(
            (resource) => resource.is_featured
        );
    }, [resources]);

    /* =========================================================
       FILTERED RESOURCES
    ========================================================= */

    const filteredResources = useMemo(() => {
        if (selectedCategory === "all") {
            return resources;
        }

        return resources.filter(
            (resource) =>
                resource.category === selectedCategory
        );
    }, [resources, selectedCategory]);

    /* =========================================================
       CATEGORY LABEL
    ========================================================= */

    const getCategoryLabel = (resource) => {
        return (
            resource.category_display ||
            resource.category?.replaceAll("_", " ") ||
            "Travel"
        );
    };

    return (
        <main className="resources-page">

            {/* =================================================
                HERO
            ================================================= */}

            <section className="resources-hero">

                <div className="resources-hero__content">

                    <span className="resources-hero__eyebrow">
                        Travel Resources
                    </span>

                    <h1>
                        Plan better.
                        <br />
                        Travel further.
                    </h1>

                    <p>
                        Useful travel tools, guides and resources
                        to help you plan your next adventure.
                    </p>

                </div>

            </section>

            {/* =================================================
                CONTENT
            ================================================= */}

            <section className="resources-content">

                {/* LOADING */}

                {loading && (
                    <div className="resources-state">
                        <p>
                            Loading travel resources...
                        </p>
                    </div>
                )}

                {/* ERROR */}

                {!loading && error && (
                    <div className="resources-state resources-state--error">
                        <p>{error}</p>
                    </div>
                )}

                {/* EMPTY */}

                {!loading &&
                    !error &&
                    resources.length === 0 && (
                        <div className="resources-state">
                            <p>
                                Travel resources are coming soon.
                            </p>
                        </div>
                    )}

                {/* =================================================
                    RESOURCES
                ================================================= */}

                {!loading &&
                    !error &&
                    resources.length > 0 && (
                        <>

                            {/* =================================================
                                FEATURED
                            ================================================= */}

                            {featuredResources.length > 0 && (
                                <section className="resources-section resources-featured">

                                    <div className="resources-section__header">

                                        <div>

                                            <span className="resources-section__eyebrow">
                                                Featured
                                            </span>

                                            <h2>
                                                Start with these
                                            </h2>

                                        </div>

                                    </div>

                                    <div className="resources-featured__grid">

                                        {featuredResources.map(
                                            (resource) => (
                                                <ResourceCard
                                                    key={resource.id}
                                                    resource={resource}
                                                    featured
                                                    getCategoryLabel={
                                                        getCategoryLabel
                                                    }
                                                />
                                            )
                                        )}

                                    </div>

                                </section>
                            )}

                            {/* =================================================
                                FILTER + RESOURCE LIST
                            ================================================= */}

                            <section className="resources-section">

                                <div className="resources-section__header">

                                    <div>

                                        <span className="resources-section__eyebrow">
                                            Explore
                                        </span>

                                        <h2>
                                            Travel Resources
                                        </h2>

                                    </div>

                                </div>

                                {/* CATEGORY FILTERS */}

                                <div className="resources-filters">

                                    <button
                                        type="button"
                                        className={
                                            selectedCategory === "all"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setSelectedCategory("all")
                                        }
                                    >
                                        All
                                    </button>

                                    {categories.map(
                                        (category) => (
                                            <button
                                                key={category.value}
                                                type="button"
                                                className={
                                                    selectedCategory ===
                                                    category.value
                                                        ? "active"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        category.value
                                                    )
                                                }
                                            >
                                                {category.label}
                                            </button>
                                        )
                                    )}

                                </div>

                                {/* =================================================
                                    RESOURCE GRID
                                ================================================= */}

                                {filteredResources.length > 0 ? (
                                    <div className="resources-grid">

                                        {filteredResources.map(
                                            (resource) => (
                                                <ResourceCard
                                                    key={resource.id}
                                                    resource={resource}
                                                    getCategoryLabel={
                                                        getCategoryLabel
                                                    }
                                                />
                                            )
                                        )}

                                    </div>
                                ) : (
                                    <div className="resources-state">
                                        <p>
                                            No resources found in this
                                            category.
                                        </p>
                                    </div>
                                )}

                            </section>

                        </>
                    )}

            </section>

        </main>
    );
}

/* =========================================================
   RESOURCE CARD
========================================================= */

function ResourceCard({
    resource,
    featured = false,
    getCategoryLabel,
}) {

    /* =========================================================
       IMAGE
    ========================================================= */

    const imageUrl = resource.image
        ? getMediaUrl(resource.image)
        : resource.partner?.main_image
            ? getMediaUrl(resource.partner.main_image)
            : null;

    /* =========================================================
       CARD CLASS
    ========================================================= */

    const cardClass = featured
        ? "resource-card resource-card--featured"
        : "resource-card";

    /* =========================================================
       PARTNER PACKAGE
       
       The new JSON stores this inside:
       
       resource.partner.package_display
    ========================================================= */

    const packageDisplay =
        resource.partner?.package_display ||
        "Standard Listing";

    /* =========================================================
       DETERMINE BADGE TYPE
    ========================================================= */

    const packageName =
        packageDisplay.toLowerCase();

    const isSponsored =
        packageName.includes("sponsored");

    const isFeatured =
        packageName.includes("featured");

    const badgeClass = isSponsored
        ? "resource-badge resource-badge--sponsored"
        : isFeatured
            ? "resource-badge resource-badge--featured"
            : "resource-badge resource-badge--standard";

    return (

        <article className={cardClass}>

            {/* =================================================
                IMAGE / MEDIA
            ================================================= */}

            <Link
                to={`/resources/${resource.slug}/`}
                className="resource-card__media-link"
            >

                <div className="resource-card__media">

                    {/* IMAGE */}

                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={resource.title}
                            className="resource-card__image"
                            loading="lazy"
                        />
                    ) : (
                        <div className="resource-card__image-placeholder">

                            <span>
                                {getCategoryLabel(resource)}
                            </span>

                        </div>
                    )}

                    {/* =================================================
                        PACKAGE BADGE
                    ================================================= */}

                    <div className="resource-card__badge">

                        <span className={badgeClass}>

                            {isFeatured && "★ "}

                            {packageDisplay}

                        </span>

                    </div>

                </div>

            </Link>

            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="resource-card__content">

                {/* CATEGORY */}

                <span className="resource-card__category">

                    {getCategoryLabel(resource)}

                </span>

                {/* TITLE */}

                <h3>
                    {resource.title}
                </h3>

                {/* DESCRIPTION */}

                <p>
                    {truncateText(
                        resource.description,
                        15
                    )}
                </p>

                {/* LINK */}

                <Link
                    to={`/resources/${resource.slug}/`}
                    className="resource-card__link"
                >

                    Explore Resource

                    <FaArrowUpRightFromSquare />

                </Link>

            </div>

        </article>
    );
}