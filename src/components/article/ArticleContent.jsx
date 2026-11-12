import '../../styles/ArticleContent.css';

import { getMediaUrl } from '../../utils/mediaUrl';


function ArticleContent({ article }) {

    if (!article) return null;

    return (

        <article className="article-content">

            <h1 className='article-title'>
                {article.title}
            </h1>

            <div className="article-meta">

                {/* <div className="article-author">

                    <img 
                        src={getMediaUrl(article.author?.photo)}
                        alt={article.author?.name || 'Author'}
                        className='author-avatar'
                    />

                    <span className="author-name">

                        {article.author?.name}

                    </span>

                </div> */}

                {/* <span className='meta-divider'>&bull;</span> */}

                <span>
                    {/* <FaCalendarDays/> */}
                    {new Date(article.published_at).toLocaleDateString('en-ZA',
                        {
                            month: 'long',
                            day: '2-digit',
                            year: 'numeric',
                        }
                    )}
                </span>

                <span className='meta-divider'>&bull;</span>

                <span>
                    {/* <FaClock /> */}
                    {article.reading_time} min read
                </span>

                <span className='meta-divider'>&bull;</span>

                <span>
                    {article.views || 0} Views
                </span>

            </div>

            <div className="article-category">
                    
                {article.category?.name}

                {article.category && article.subcategory && (
                    <span className='category-separator'>
                        /
                    </span>
                )}

                {article.subcategory?.name}
                
            </div>

            <img 
                src={getMediaUrl(article.hero_image)} 
                alt={article.title}
                className='article-hero' 
            />

        </article>
    );
}

export default ArticleContent;