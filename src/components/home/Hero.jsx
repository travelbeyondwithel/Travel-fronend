import { Link } from "react-router-dom";

import "../../styles/Hero.css";
import { getMediaUrl } from "../../utils/mediaUrl";

function Hero({ article }) {

    if (!article) return null;

    const category =
        article.subcategory?.name ||
        article.category?.name ||
        "Travel";

    const formattedDate = article.published_at
        ? new Date(article.published_at).toLocaleDateString("en-ZA", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : null;

    // console.log('Hero:', article);

    return (
        <section className="hero">

            <div className="hero-container">

                {/* =========================
                    LEFT SIDE
                ========================= */}

                <div className="hero-content">

                    <div className="hero-meta">

                        <span className="hero-category">
                            {category}
                        </span>

                        {formattedDate && (
                            <>
                                <span className="hero-divider">
                                    /
                                </span>

                                <span className="hero-date">
                                    {formattedDate}
                                </span>
                            </>
                        )}

                        {article.reading_time && (
                            <>
                                <span className="hero-divider">
                                    /
                                </span>

                                <span className="hero-reading-time">
                                    {article.reading_time} min read
                                </span>
                            </>
                        )}

                    </div>

                    <h1>
                        {article.title}
                    </h1>

                    {article.introduction && (
                        <p>
                            {article.introduction}
                        </p>
                    )}

                    <Link
                        to={`/articles/${article.slug}`}
                        className="hero-read-more"
                    >
                        READ MORE
                        <span>→</span>
                    </Link>

                </div>

                {/* =========================
                    RIGHT SIDE IMAGE
                ========================= */}

                <div className="hero-image">

                    <img
                        src={getMediaUrl(article.hero_image)}
                        alt={
                            article.hero_image_alt ||
                            article.title
                        }
                    />

                </div>

            </div>

        </section>
    );
}

export default Hero;