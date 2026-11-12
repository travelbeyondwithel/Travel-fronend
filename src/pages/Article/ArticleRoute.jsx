import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Article from "./Article";

import SubcategoryArticles
    from "../../components/article/SubcategoryArticles";

import { resolveArticleSlug }
    from "../../api/articleApi";

function ArticleRoute() {

    const { slug } = useParams();

    const [type, setType] = useState(null);

    const [subcategory, setSubcategory] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function resolveSlug() {

            try {

                const response =
                    await resolveArticleSlug(slug);

                setType(
                    response.data.type
                );

                if (
                    response.data.type ===
                    "subcategory"
                ) {

                    setSubcategory(
                        response.data.subcategory
                    );

                }

            }

            catch (error) {

                console.error(
                    "Unable to resolve slug:",
                    error
                );

                setType("not-found");

            }

            finally {

                setLoading(false);

            }

        }

        if (slug) {
            resolveSlug();
        }


    }, [slug]);

    if (loading) {

        return (
            <h1>
                Loading...
            </h1>
        );

    }

    if (type === "subcategory") {

        return (
            <SubcategoryArticles
                subcategory={subcategory}
            />
        );

    }

    if (type === "article") {

        return <Article />;

    }

    return (

        <h1>
            Page not found.
        </h1>

    );

}

export default ArticleRoute;