import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";

import useArticles from "../../hooks/useArticles";
import "../../styles/TravelGuide.css";
import { truncateText } from "../../utils/truncate";
import { FaAngleRight } from "react-icons/fa6";

function TravelGuide({
    initialCount = 6, 
    loadCount = 6, 
}) { 


    const {

        travelGuides,

        // travelGuides = [],

        loading,

        error

    } = useArticles();

    const [visibleCount, setVisibleCount] = useState(initialCount); 

    // If the articles themselves change, make sure 
    // we don't end up with an invalid visible count. 

    useEffect(() => { 
        if (travelGuides.length === 0) { 
            setVisibleCount(initialCount); 
        } 
    }, [travelGuides.length, initialCount]); 
    
    const visibleArticles = travelGuides.slice(0, visibleCount); 
    
    const handleLoadMore = () => { 
        setVisibleCount((currentCount) => {
            return Math.min( 
                currentCount + loadCount, 
                travelGuides.length 
            ); 
        }); 
    }; 

    const hasMoreArticles = visibleCount < travelGuides.length; 


    return (

        <main className="travel-guide-page">

        {/* Intro */}
        <section className="travel-guide-intro">
            <div className="travel-intro">
                <span className="travel-guide-eyebrow">
                    YOUR JOURNEY STARTS HERE
                </span>

                <h1>Travel with more than just a destination in mind.</h1>

                <p>
                From planning your trip to discovering experiences worth
                remembering, our travel guides are here to help you make
                the most of every journey.
                </p>
            </div>
        </section>

        {/* Guides */}
        <section className="travel-guides-section">
            <div className="travel-guides-heading">
                <span className="travel-guides-heading-eyebrow">
                    TRAVEL GUIDES
                </span>
                <h2>Plan. Explore. Experience.</h2>
            </div>

            <div className="travel-guides-grid">
            {visibleArticles.length > 0 ? (
                visibleArticles.map((travelGuide) => (
                    
                <article
                    className="travel-guide-card"
                    key={travelGuide.id}
                >
                    
                        <div className="travel-sub">
                            <h3>{travelGuide.title}</h3>
                            {travelGuide.category && (
                                <span className="travel-category">{travelGuide.category}</span>
                            )}
                        </div>
                    <div className="travel-guide-card-image">
                        <img
                        src={travelGuide.hero_image || travelGuide.featured_image}
                        alt={travelGuide.title}
                        />
                    </div>

                    <div className="travel-guide-card-content">
                        <div className="travel-guide-meta">
                        
                        {travelGuide.published_at && (
                        <span>
                            {new Date(travelGuide.published_at).toLocaleDateString('en-ZA',
                                {
                                    month: 'long',
                                    day: '2-digit',
                                    year: 'numeric',
                                }
                            )}
                        </span>
                        )}

                        {travelGuide.reading_time && (
                            <span>
                                {travelGuide.reading_time} min read
                            </span>
                        )}
                        </div>

                        <p>
                        {truncateText(travelGuide.introduction, 25)}
                        </p>

                    <Link to={`/articles/${travelGuide.slug}`}>
                        <span className="travel-guide-read">
                            Read guide <FaAngleRight/>
                        </span>
                    </Link>
                    </div>
                </article>
                ))
            ) : (
                <div className="empty-guides">
                <h3>No travel guides yet</h3>

                <p>
                    We're preparing new guides to help you experience
                    more of the world.
                </p>
                </div>
            )}

                {hasMoreArticles && ( 
                    <div className="load-more-container"> 
                        <button type="button" className="travel-load-more" onClick={handleLoadMore} > 
                            Load More 
                        </button> 
                    </div> 
                )}  
            </div>
        </section>
        
        </main>
    );
};

export default TravelGuide;