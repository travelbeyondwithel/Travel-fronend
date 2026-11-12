import '../../styles/FeaturedArticles.css';

import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa6';

import { getMediaUrl } from '../../utils/mediaUrl';
import { truncateText } from '../../utils/truncate';

function FeaturedArticles({ featured = [], articles = [] }) {

    // Prefer the featured articles coming from the API.
    // If featured is empty, fall back to articles marked as featured.
    const featuredList =
        featured?.length > 0
            ? featured
            : articles?.filter(article => article.is_featured);

    if (!featuredList?.length) {
        return null;
    }

    // Only show the first 6 in this section.
    const displayedArticles = featuredList.slice(0, 6);

    // Split into two columns.
    const leftArticles = displayedArticles.slice(0, 3);
    const rightArticles = displayedArticles.slice(3, 6);

    return (
        <section className="featured">

            <div className="featured-container">

                {/* =========================
                    HEADER
                ========================= */}

                <div className="featured-header">

                    <h2>
                        FEATURED ARTICLES
                    </h2>

                    <Link
                        to="/blog"
                        className="featured-view-all"
                    >
                        View all
                        <FaAngleRight />
                    </Link>

                </div>

                {/* =========================
                    ARTICLES
                ========================= */}

                <div className="featured-grid">

                    {/* LEFT COLUMN */}

                    <div className="featured-column">

                        {leftArticles.map((article) => (
                            <FeaturedItem
                                key={article.id}
                                article={article}
                            />
                        ))}

                    </div>

                    {/* RIGHT COLUMN */}

                    <div className="featured-column">

                        {rightArticles.map((article) => (
                            <FeaturedItem
                                key={article.id}
                                article={article}
                            />
                        ))}

                    </div>

                </div>

            </div>

        </section>
    );
}

/* =========================================
   FEATURED ARTICLE
========================================= */

function FeaturedItem({ article }) {

    if (!article) return null;

    const category =
        article.subcategory?.name ||
        article.category?.name ||
        'Travel';

    const formattedDate = article.published_at
        ? new Date(article.published_at).toLocaleDateString(
            'en-GB',
            {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            }
        )
        : null;

    const authorName =
        typeof article.author === 'string'
            ? article.author
            : article.author?.name ||
            article.author?.full_name ||
            'Travel Beyond with El';

    return (
        <article className="featured-item">

            {/* IMAGE */}

            <Link
                to={`/articles/${article.slug}`}
                className="featured-image-link"
            >

                <img
                    src={getMediaUrl(article.hero_image)}
                    alt={
                        article.hero_image_alt ||
                        article.title
                    }
                />

            </Link>

            {/* CONTENT */}

            <div className="featured-content">

                <div className="featured-meta">

                    {formattedDate && (
                        <span>
                            {formattedDate}
                        </span>
                    )}

                    <span className="featured-slash">
                        /
                    </span>

                    <span className="featured-category">
                        {article.category}
                    </span>

                </div>

                <Link
                    to={`/articles/${article.slug}`}
                    className="featured-title"
                >
                    {truncateText(article.introduction, 15)}
                </Link>

                <span className="featured-author">
                    {authorName}
                </span>

            </div>

        </article>
    );
}

export default FeaturedArticles;