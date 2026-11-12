import '../../styles/RelatedArticles.css';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';

import { getMediaUrl } from '../../utils/mediaUrl';

function RelatedArticles({ articles }) {

    if (!articles?.length) return null;

    return (

        <section className='related-articles'>

            <div className="related-header">

                <h2>Related Articles</h2>

            </div>

            <div className="related-grid">

                {articles.slice(0, 5).map((article) => (



                    <article className='related-card' key={article.id}>
                        

                        <Link
                            key={article.id}
                            to={`/articles/${article.slug}`}
                            className='related-item'
                        >

                                <img src={getMediaUrl(article.hero_image)} alt={article.title} className='related-thumb' />

                            <div className="related-info">

                                <h3>{article.title}</h3>

                                <p  className='related-date'> 
                                    {new Date(article.published_at).toLocaleDateString('en-ZA',
                                        {
                                            month: 'long',
                                            day: '2-digit',
                                            year: 'numeric',
                                        }
                                    )}
                                </p>

                            </div>

                        </Link>

                    </article>
                ))}
            </div>


        </section>
    );
}

export default RelatedArticles;