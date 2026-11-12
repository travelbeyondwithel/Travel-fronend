import '../../styles/articleCard.css';
import { Link } from 'react-router-dom';
import {
    FaHeart,
    FaRegCommentDots,
    // FaShareAlt,
} from '../../assets/icons';


function ArticleCard({ article }) {

    const FormattedDate = new Date(article.published_at).toLocaleDateString(
        'en-ZA', 
        {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }
    );

    return (

        <Link to={`/article/${article.slug}`} className='article-link'>

            <article className='article-card'>

                <img src='{article.hero_image' alt='article.title'/>
                {/* <img src='/hero.jpg' alt='Cape Town'/> */}

                <div className='article-content'>

                    <span className='article-category'>
                        {article.category.name}
                    </span>

                    <h3>
                        {article.title}
                    </h3>

                    <p>
                        {article.excerpt}
                    </p>

                    <div className='article-meta'>

                        <span>
                            {article.reading_time} min read
                        </span>

                        <span>.</span>

                        <span>
                            {FormattedDate}
                        </span>

                    </div>

                    <div className='article-stats'>

                        <span>
                            <FaHeart />
                            {article.likes_count}
                        </span>

                        <span>
                            <FaRegCommentDots />
                            {article.comments_count}
                        </span>

                        <span>
                            {/* <FaShareAlt /> */}
                        </span>

                    </div>

                </div>

            </article>

        </Link>
    );
}

export default ArticleCard;