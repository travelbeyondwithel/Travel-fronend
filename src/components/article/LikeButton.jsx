import '../../styles/LikeButton.css';

import { useEffect, useState } from 'react';

import { FaHeart } from 'react-icons/fa';
import { likeArticle, getLikeStatus } from '../../api/likeApi';
import { getBrowserId } from '../../utils/browserId';

function LikeButton({ article }) {

    const [liked, setLiked] = useState(
        article?.liked || false
    );

    const [likes, setLikes] = useState(
        article?.likes || 0
    );

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!article?.slug) {
            return;
        }

        const loadLikeStatus = async () => {

            try {
                // Set initial values from article
                setLiked(
                    article.liked || false
                );
        
                setLikes(
                    article.likes || 0
                );

                // Ask backend whether This browser has liked it
                const response = await getLikeStatus(article.slug);

                setLiked(response.data.liked);
                setLikes(response.data.likes);
            } catch (error) {
                console.error('Unable to get like status:', error);
            }
        };

        loadLikeStatus();

    }, [article]);


    const handleLike = async () => {

        if (
            loading ||
            !article?.slug
        ) {
            return;
        }

        setLoading(true);

        try {
            const response = await likeArticle(
                article.slug
            );

            // const data = response?.data;

            setLiked(
                response.data.liked
            );

            setLikes(
                response.data.likes
            );
        }  catch (error) {
            console.error(
                'Unable to like article',
                'You already liked this article'
            );
            // alert('You already liked this article');
        } finally {
            setLoading(false);
        }

    };

    // async function handleLike(){

    //     try{

    //         await likeArticle({

    //             article: article.id,
    //             browser_id: getBrowserId()

    //         });
    //         alert('Thanks for liking this article!');
    //     }

    //     catch{
    //         alert('You already liked this article');
    //     }
    // }

    return(

        <div className="like">

            <button type='button' className={`like-button ${
                    liked
                        ? 'liked'
                        : ''
                }`}
                onClick={handleLike}
                disabled={loading}
            >

                <FaHeart className='like-icon'/>

                <span className='like-count'>
                    {likes}
                </span>
                <span className='like-label'>
                    Likes
                </span>

            </button>

        </div>

    );
}

export default LikeButton;


{/* <div className="views">
<FaEye className='views-icon' />

<span className="views-count">
    {article.views ?? 0}
</span>

<span className="views-label">
    {article.views === 1 ? 'View' : 'Views'}
</span>
</div> */}