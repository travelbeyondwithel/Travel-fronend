import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom"; 
import { FaAngleRight } from "react-icons/fa6"; 
import "../../styles/LatestArticles.css"; 
import { getMediaUrl } from "../../utils/mediaUrl"; 
import { truncateText } from "../../utils/truncate"; 

function LatestArticles({ articles = [],
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

    return ( 
        <section className="latest-articles"> 

            <div className="header">
                <h2>
                    Latest Articles
                </h2>
            </div>
            <div className="latest-container"> 
                <div className="latest-grid"> 
                
                    {visibleArticles.map((article) => ( 
                        <article className="latest-card" key={article.id} > 
                            <div className="latest-header"> 
                                <h3>{article.title}</h3> 

                                <span className="latest-category"> 

                                <div className="latest-sub">
                                    {article.subcategory?.name} 
                                </div>

                                /

                                <div className="latest-cat">
                                    {article.category?.name || article.category}
                                </div>


                                </span> 
                            </div> 

                            <img src={getMediaUrl(article.hero_image)} alt={article.title} /> 
                            
                            <div className="latest-content"> 
                                <p> {truncateText( article.introduction, 25 )} </p> 
                                <Link to={`/articles/${article.slug}`} className="read-more" > 
                                    Read More <FaAngleRight /> 
                                </Link> 
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
            </div> 
        </section> ); } 

export default LatestArticles;