import { useEffect, useState } from 'react';

import '../../styles/Statistics.css'

import LikeButton from './LikeButton';
import Views from './Views';
import Comments from './Comments';
import CommentCount from './CommentCount';



function Statistics({ statistic }) {

    // console.log('STATISTIC DATA:', statistic);
    
    const [comments, setComments] = useState([]);
    useEffect(() => {

        if (statistic) {
            setComments(statistic.comments || []);
        }

    }, [statistic]);

    if (!statistic) return null;

    return (

        <>

            <section className="statistics">

                <div className="statistics-item">

                    <LikeButton article={statistic} />
                    
                </div>

                <div className="statistics-item">

                    <CommentCount comments={comments} />

                </div>

            </section>

            <div className="article-comments">

                <Comments article={statistic} comments={comments} setComments={setComments} />

            </div>

        </>
    );

}

export default Statistics;