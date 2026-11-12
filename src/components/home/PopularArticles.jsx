import { useEffect, useState } from "react"; 
import { Link } from 'react-router-dom';

import '../../styles/PopularArticles.css';
import { FaAngleRight } from 'react-icons/fa6';

import { getMediaUrl } from '../../utils/mediaUrl';
import { truncateText } from '../../utils/truncate';


function PopularArticles({ articles = [],
    initialCount = 3, 
    loadCount = 3, 
}) { 

    const [visibleCount, setVisibleCount] = useState(initialCount); 

    // If the articles themselves change, make sure 
    // we don't end up with an invalid visible count. 

    useEffect(() => { 
        if (articles.length === 0) { 
            setVisibleCount(initialCount); 
        } 
    }, [articles.length, initialCount]); 
    
    const visibleArticles = articles.slice(0, visibleCount); 
    
    const handleLoadMore = () => { 
        setVisibleCount((currentCount) => {
            return Math.min( 
                currentCount + loadCount, 
                articles.length 
            ); 
        }); 
    }; 

    const hasMoreArticles = visibleCount < articles.length;

    
    return(
        
        <section className='popular-section'>

            <div className="popular-header">
                <h2>
                    Popular Articles
                </h2>
            </div>

            <div className="popular-grid">
                {visibleArticles.map((article) => (

                    <article className="popular-card" key={article.id}>


                        <div className="popular-content">

                            <h3>{article.title}</h3>

                            <span className="popular-category">

                                <div className="popular-sub">
                                    {article.subcategory?.name || article.subcategory}
                                </div>
                                /
                                <div className="popular-cat">
                                    {article.category?.name || article.category}
                                </div>

                            </span>

                            <img 
                                src={getMediaUrl(article.hero_image)} 
                                alt={article.title} 
                                className='popular-image'
                            />

                            <div className="popular-main">

                                <p>
                                    {truncateText(article.introduction, 25)}
                                </p>


                                {/* <div className="popular-meta">
                                    <span>
                                        {new Date(article.published_at).toLocaleDateString()}
                                        {/* {formattedDate}}
                                    </span>

                                    <span>
                                        {article.reading_time} min read
                                    </span>
                                </div> */}

                                <Link to={`/articles/${article.slug}`} className='read-more'>
                                    Read More <FaAngleRight />
                                </Link>

                            </div>

                        </div>

                    </article>

                ))}
            </div>

            {hasMoreArticles && ( 
                <div className="load-more-container"> 
                    <button type="button" className="load-more" onClick={handleLoadMore} > 
                        Load More 
                    </button> 
                </div> 
            )} 


        </section>
    );
}

export default PopularArticles;