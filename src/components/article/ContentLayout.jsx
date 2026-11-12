import { useEffect, useState } from 'react';
import '../../styles/ContentLayout.css';

import RelatedArticles from '../article/RelatedArticles';
import Profile from './Profile';
import { getArticles, getTravelGuides, getEvents } from '../../api/articleApi';

function ContentLayout({
    children,
    // relatedArticles = []
    type = 'blog'
}) {

    const [relatedArticles, setRelatedArticles] = useState([]);

    useEffect(() => {
        async function fetchRelatedContent() {

            try {
                let response;

                if (type === 'travel-guide') {
                    response = await getTravelGuides();

                } else if (type === 'events') {
                    response = await getEvents();
                } else {
                    response = await getArticles();
                }

                const content = response.data || [];

    
                setRelatedArticles(
                    response.data.slice(0, 3)
                );
            } catch (error) {
                console.error(
                    'Error fetching related articles:',
                    error
                );
                setRelatedArticles([]);
            }
        }

        fetchRelatedContent();
    }, [type]);

    return (

        <section className="content-layout">
            <main className="content-main">
                {children}
            </main>

            <aside className="content-sidebar">

                <Profile />

                <RelatedArticles
                    articles={relatedArticles}
                />

            </aside>
        </section>
    )
}

export default ContentLayout;