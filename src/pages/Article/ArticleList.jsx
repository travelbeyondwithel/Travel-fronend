import { useState } from "react";
import { Link } from "react-router-dom";

import "../../styles/ArticleList.css";
import { getMediaUrl } from "../../utils/mediaUrl";
import { truncateText } from "../../utils/truncate";
import { FaAngleRight } from "react-icons/fa6";

function ArticleList({
    articles = [],
    initialCount = 6,
    loadCount = 6,
}) {

    const [visibleCount, setVisibleCount] =
        useState(initialCount);

    if (!articles || articles.length === 0) {
        return (
            <div className="article-list-empty">
                <h2>No articles yet</h2>

                <p>
                    New stories are coming soon.
                </p>
            </div>
        );
    }

    const visibleArticles =
        articles.slice(0, visibleCount);

    const showReadMore =
        visibleCount < articles.length;

    return (
        <div className="article-list-wrapper">

            <div className="article-list">

                {visibleArticles.map((article) => (

                    <article
                        key={article.id}
                        className="article-list-card"
                    >

                        <Link
                            to={`/articles/${article.slug}`}
                            className="article-list-link"
                        >

                            {article.hero_image && (

                                <div className="article-list-image">

                                    <img
                                        src={getMediaUrl(
                                            article.hero_image
                                        )}
                                        alt={
                                            article.hero_image_alt ||
                                            article.title
                                        }
                                    />

                                </div>

                            )}

                            <div className="article-list-content">

                                {article.category && (

                                    <span className="article-list-category">

                                        {typeof article.category === "object"
                                            ? article.category.name
                                            : article.category}

                                    </span>

                                )}

                                <h2>
                                    {article.title}
                                </h2>

                                {article.introduction && (

                                    <p>
                                        {truncateText(
                                            article.introduction,
                                            30
                                        )}
                                    </p>

                                )}

                                <span className="article-list-read">

                                    Read article <FaAngleRight />

                                </span>

                            </div>

                        </Link>

                    </article>

                ))}

            </div>

            {showReadMore && (

                <div className="article-list-read-more">

                    <button
                        className="load-more"
                        type="button"
                        onClick={() =>
                            setVisibleCount(
                                previousCount =>
                                    previousCount + loadCount
                            )
                        }
                    >
                        Load More
                    </button>

                </div>

            )}

        </div>
    );
}

export default ArticleList;