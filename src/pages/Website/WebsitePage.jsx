import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

import { getWebsitePage } from "../../api/websitePageApi";
import "../../styles/WebsitePage.css";

export default function WebsitePage({ pageType }) {
    // const { pageType } = useParams();

    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        setLoading(true);
        setError("");
        setPage(null);

        getWebsitePage(pageType)
            .then(({ data }) => {
                if (!cancelled) setPage(data);
            })
            .catch(() => {
                if (!cancelled) {
                    setError(
                        "This page is unavailable right now."
                    );
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [pageType]);

    if (loading) {
        return <main className="website-page">
            <p>Loading page...</p>
        </main>;
    }

    if (error || !page) {
        return <main className="website-page">
            <p>{error || "Page not found."}</p>
        </main>;
    }

    return (
        <main className="website-page">
            <header className="website-page__header">
                <p className="website-page__eyebrow">
                    Travel Beyond with El
                </p>

                <h1>{page.title}</h1>

                {page.introduction && (
                    <p className="website-page__intro">
                        {page.introduction}
                    </p>
                )}
            </header>

            <article
                className="website-page__content"
                dangerouslySetInnerHTML={{
                    __html: page.content || "",
                }}
            />
        </main>
    );
}