import { useEffect, useState } from 'react';
import '../../styles/Blog.css';

import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa6';

import { getArticles } from '../../api/articleApi';
import { getMediaUrl } from '../../utils/mediaUrl';
import { truncateText } from "../../utils/truncate";


function Blog() {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Number of articles currently visible
    const [visibleArticles, setVisibleArticles] = useState(3);

    useEffect(() => {

        async function fetchArticles() {

            try {

                const response = await getArticles();

                setArticles(response.data);

            } catch (err) {

                console.error(
                    'Error fetching blog articles:',
                    err
                );

                setError(
                    'Unable to load articles.'
                );

            } finally {

                setLoading(false);

            }

        }

        fetchArticles();

    }, []);



    // ==========================
    // LOADING
    // ==========================

    if (loading) {

        return (

            <main className="blog-page">


                <section className="blog-header">

                    <h1>
                        Our Stories
                    </h1>

                    <p>
                        Discover travel stories, experiences,
                        events and guides from Travel Beyond with El.
                    </p>

                </section>

                <div className="blog-status">

                    <p>
                        Loading articles...
                    </p>

                </div>

            </main>

        );

    }

    // ==========================
    // ERROR
    // ==========================

    if (error) {

        return (

            <main className="blog-page">

                <section className="blog-header">

                    <h1>
                        Our Stories
                    </h1>

                    <p>
                        Discover travel stories, experiences,
                        events and guides from Travel Beyond with El.
                    </p>

                </section>

                <div className="blog-status error">

                    <p>
                        {error}
                    </p>

                </div>

            </main>

        );

    }

    // ==========================
    // BLOG
    // ==========================

    return (

        <main className="blog-page">

            {/* ==========================
                BLOG HEADER
            ========================== */}

            <section className="blog-header">

                <span className="blog-eyebrow">
                    EXPLORE
                </span>

                <h1>
                    Stories Worth Discovering
                </h1>

                <p>
                    Explore destinations, experiences, events and
                    travel stories that inspire you to go beyond
                    the ordinary.
                </p>

            </section>

            {/* ==========================
                ARTICLES
            ========================== */}

            <section className="blog-articles">

                <div className="blog-container">

                    {articles.length === 0 ? (

                        <div className="blog-status">

                            <p>
                                No articles available yet.
                            </p>

                        </div>

                    ) : (

                        <>

                            {/* ==========================
                                BLOG GRID
                            ========================== */}

                            <div className="blog-grid">

                                {articles
                                    .slice(0, visibleArticles)
                                    .map((article) => {

                                        const formattedDate =
                                            article.published_at
                                                ? new Date(
                                                    article.published_at
                                                ).toLocaleDateString(
                                                    'en-ZA',
                                                    {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    }
                                                )
                                                : '';

                                        return (

                                            <article
                                                key={article.id}
                                                className="blog-card"
                                            >

                                                {/* ==========================
                                                    TOP CONTENT
                                                ========================== */}

                                                <div className="blog-content">

                                                <div className="intro-content">

                                                    <h2>
                                                            {article.title}
                                                    </h2>

                                                    {/* CATEGORY */}

                                                    {article.category && (

                                                        <span className="blog-category">

                                                            {typeof article.category === "object"
                                                                ? article.category.name
                                                                : article.category
                                                            }

                                                        </span>

                                                    )}
                                                </div>

                                                    {/* IMAGE */}

                                                    <Link
                                                        to={`/articles/${article.slug}`}
                                                        className="blog-image-link"
                                                    >

                                                        <img
                                                            src={getMediaUrl(
                                                                article.hero_image
                                                            )}
                                                            alt={
                                                                article.hero_image_alt ||
                                                                article.title
                                                            }
                                                            className="blog-image"
                                                        />

                                                    </Link>

                                                </div>

                                                {/* ==========================
                                                    ARTICLE CONTENT
                                                ========================== */}

                                                <div className="blog-card-content">

                                                    {/* INTRODUCTION */}

                                                    <p className="blog-introduction">

                                                        {truncateText(article.introduction, 25)}

                                                    </p>

                                                    {/* META */}

                                                    <div className="blog-meta">

                                                        <span>

                                                            By{' '}

                                                            {article.author || 'with El'}

                                                        </span>

                                                        <span className='meta-divider'>&bull;</span>

                                                        <span>

                                                            {formattedDate}

                                                        </span>

                                                        <span className='meta-divider'>&bull;</span>

                                                        <span>

                                                            {article.reading_time || 1}
                                                            {' '}
                                                            min read

                                                        </span>

                                                    </div>

                                                    {/* READ MORE */}

                                                    <Link
                                                        to={`/articles/${article.slug}`}
                                                        className="blog-read-more"
                                                    >

                                                        Read More

                                                        <FaAngleRight />

                                                    </Link>

                                                </div>

                                            </article>

                                        );

                                    })}

                            </div>

                            {/* ==========================
                                LOAD MORE
                            ========================== */}

                            {visibleArticles < articles.length && (

                                <div className="blog-load-more">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setVisibleArticles(
                                                previous => previous + 2
                                            )
                                        }
                                    >

                                        Load More

                                    </button>

                                </div>

                            )}

                        </>

                    )}

                </div>

            </section>

        </main>


    );

}

export default Blog;