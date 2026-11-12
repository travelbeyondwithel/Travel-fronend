import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from 'react-icons/fa6';

import "../../styles/SubcategoryArticles.css";

import { getSubcategoryArticles } from "../../api/articleApi";

import ArticleList from "../../pages/Article/ArticleList";

function SubcategoryArticles({ subcategory }) {

    const [articles, setArticles] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        async function fetchArticles() {

            try {

                setLoading(true);

                setError(null);

                const response =
                    await getSubcategoryArticles(
                        subcategory.slug
                    );

                setArticles(
                    response.data
                );

            }

            catch (err) {

                console.error(
                    "Error loading subcategory articles:",
                    err
                );

                setError(
                    "Unable to load articles."
                );

            }

            finally {

                setLoading(false);

            }

        }

        if (subcategory?.slug) {

            fetchArticles();

        }

    }, [subcategory]);

    if (loading) {

        return (
            <p>
                Loading articles...
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

        <main className="subcategory-articles-page">

            <section className="subcategory-articles-header">

                <h1>
                    {subcategory.name}
                </h1>

                {/* <p>
                    Discover stories, places and
                    experiences from {subcategory.name}.
                </p> */}

            </section>

            <section className="subcategory-articles-section">

                <ArticleList
                    articles={articles}
                    initialCount={6}
                    loadCount={6}
                />

            </section>

        </main>

    );

}

export default SubcategoryArticles;