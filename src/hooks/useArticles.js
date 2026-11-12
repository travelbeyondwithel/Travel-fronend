import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import {
    getArticles, 
    getArticle, 
    getDestinations,
    getTravelGuides, 
    getEvents, 
} from "../api/articleApi";

export default function useArticles(slug) {

    const [article, setArticle] = useState(null);

    const [destinations, setDestinations] = useState([]);

    const [travelGuides, setTravelGuides] = useState([]);

    const [events, setEvents] = useState([]);

    const [relatedArticles, setRelatedArticles] = useState([]);

    const [subcategoryArticles, setSubcategoryArticles] = useState([]);

    const [subcategory, setSubcategory] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    // const { slug } = useParams();

    useEffect(() => {

        async function fetchContent() {

            try {

                setLoading(true);
                setError(null);

                setArticle(null);
                setSubcategory(null);
                setSubcategoryArticles([]);
                setRelatedArticles([])

                // Fetch current article


                const responses = await Promise.all([
                        getArticles(),
                        getDestinations(),
                        getTravelGuides(),
                        getEvents(),
                ]);

                // console.log('ALL RESPONSES:', responses);

                const articlesResponse = responses[0];
                const destinationsResponse = responses[1];
                const travelGuidesResponse = responses[2];
                const eventsResponse = responses[3];

                // console.log('Article API:', articlesResponse);
                // console.log('Destinations API:', destinationsResponse);
                // console.log('Travel Guides API:', travelGuidesResponse);
                // console.log('Events API:', eventsResponse);

                // console.log('Travel Guides Api:', travelGuidesResponse?.data);
                // const [
                //     articleResponse = responses[0];
                //     destinationsResponse;
                //     travelGuidesResponse;
                //     eventsResponse;
                // ]


                // Save all Content / Get the actual data

                const allArticles = articlesResponse.data;

                setDestinations(destinationsResponse.data);
                setTravelGuides(travelGuidesResponse.data);
                setEvents(eventsResponse.data);
            

                // article Detail

                if (slug) {

                    const articleResponse = await getArticle(slug);
                    
                    const currentArticle = articleResponse.data;
    
                    // setArticle(articleResponse.data);
                    setArticle(currentArticle);
                    
                    // Related article, setArticle(currentArticle);
                    // Remove current article and keep same category
    
                    let related = allArticles.filter(
                        item =>
                            item.id !== currentArticle.id &&
                            item.category === currentArticle.category
                    );
    
                    // If there aren't enough in the same category,
                    // fill the sidebar with the latest articles.
                    if (related.length < 3) {
    
                        const latest = allArticles.filter(
                            item =>
                                item.id !== currentArticle.id &&
                                !related.some(r => r.id === item.id)
                        );
    
                        related = [...related, ...latest].slice(0, 4);
                    }
                    setRelatedArticles(related);

                } else {
                    // No article detail page
                    setArticle(null);

                    setRelatedArticles([]);
                }

            }  

            catch (err) {
                console.error(err);
                setError('Failed to load articles.');
                // setArticles([]);

            }

            finally {
                setLoading(false);

            }

        }

        // if (slug) {
        //     fetchArticles();
        // }

        fetchContent();

    }, [slug]);

    // useEffect(() => {
    //     fetchContent();
    // }, [slug]);

        return {
    
            article,

            destinations,

            travelGuides,

            events,
    
            relatedArticles,
    
            loading,
    
            error
    
        };


}