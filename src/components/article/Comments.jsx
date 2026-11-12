import '../../styles/Comments.css';

import { useEffect, useState } from "react";

import {
    FaCommentDots,
    FaPaperPlane,
} from 'react-icons/fa6';

import {
    getComments,
    addComment,
} from '../../api/commentApi';


function Comments({ article, comments, setComments }) {

    // comments, setComments

    // const [comments, setComments] = useState([]);

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const [content, setContent] = useState('');

    const [loading, setLoading] = useState(false);

    const [loadingComments, setLoadingComments] = useState(false);

    const [error, setError] = useState('');

    const [success, setSuccess] = useState('');

    useEffect(() => {

        if (!article?.slug) {
            return;
        }

        async function loadComments() {

            setLoadingComments(true);

            try {
                const response = await getComments(
                    article.slug
                    // article.id
                );

                // console.log(
                //     'COMMENTS FROM BACKEND:',
                //     response.data
                // );

                const data = response?.data;

                if (Array.isArray(data)) {

                    setComments(data);
                } else if (
                    Array.isArray(
                        data?.results
                    )
                ) {
                    setComments(
                        data.results
                    );
                } else {
                    setComments([]);
                }
            } catch (error) {
                console.error(
                    'Error loading comments:',
                    error.response?.data || error
                );
                setComments([]);
            } finally {
                setLoadingComments(false);
            }
        }

        loadComments();
    }, [article?.slug, setComments]);

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError('');

        setSuccess('');

        if (!name.trim()) {

            setError(
                'Please enter you name.'
            );
            return;
        }

        if (!email.trim()) {
            setError(
                'Please enter your email.'
            );
            return;
        }

        if (!content.trim()) {
            setError(
                'Please write a comment.'
            );
            return;
        }

        if (!article?.slug) {

            setError(
                'Article could not be found.'
            );
            return;
        }

        setLoading(true);

        try {
            // const response = await addComment(
            const commentData = (
                // article.slug,
                {
                    article_slug: article.slug,
                    name: name.trim(),
                    email: email.trim(),
                    content: content.trim(),
                }
            );

            console.log(
                'COMMENT DATA:',
                commentData
            );

            const response = await addComment(
                commentData
            );

            console.log(
                'COMMENT CREATED:',
                response.data
            );

            const newComment = response?.data;

            setComments(
                previous => [
                    newComment,
                    ...previous,
                ]
            );

            setName('');

            setEmail('');

            setContent('');

            setSuccess(
                'Your comment has been posted.'
            );

        } catch (error) {

            console.error('COMMENT POST ERROR:', error);

            console.log('STATUS:', error.response?.status);

            console.error('BACKEND RESPONSE::', error.response?.data);

            console.log('REQUEST DATA:', error.config?.data);

            console.error(
                'Error posting comment:',
                error
            );

            if (
                error.response?.data
            ) {

                const data = error.response.data;

                if (
                    typeof data === 'string'
                ) {

                    setError(data);
                } else if (
                    data.detail
                ) {

                    setError(
                        data.detail
                    );
                } else {

                    setError(
                        'Unable to post your comment.'
                    );
                }
            } else {

                setError(
                    error.response?.data?.detail ||
                    JSON.stringify(error.response?.data) ||
                    'Unable to post your comment.'
                );
            }
        } finally {

            setLoading(false);
        }
    };

    if (!article) {
        return null;
    }


    return (

        <section className="comments">

                <form onSubmit={handleSubmit} className='comment-form'>
                    <div className="comment-form-row">

                        <input type='text' name='name' value={name} onChange={(event) => setName(
                            event.target.value
                        )} placeholder="Your Name" required />

                        <input type='email' name='email' value={email} onChange={(event) => setEmail(
                            event.target.value
                        )} placeholder="Your Email" required/>

                    </div>

                    <textarea name='content' value={content} onChange={(event) => setContent(
                        event.target.value
                    )} placeholder="Share your experience..."
                    rows='4' required></textarea>

                    {error && (

                        <p className='comment-error'>
                            {error}
                        </p>
                    )}

                    {success && (

                        <p className='comment-success'>
                            {success}
                        </p>
                    )}

                    <button type='submit' disabled={loading}>
                        <FaPaperPlane />

                        {loading
                            ? 'Posting...'
                            : 'Post Comment'
                        }
                        
                    </button>

                </form>


            <div className="comment-list">

                {loadingComments ? (

                    <p className='comments-message'>
                        Loading comments...
                    </p>

                ) : comments.length === 0 ? (

                    <p className='comments-message'>
                        Be the first to comment.
                    </p>

                ) : (

                    comments.map((comment) => (

                        <article className='comment-item' key={comment.id}>

                            <div className="comment-author">

                                <div className="comment-avatar">

                                    {(
                                        comment.name ||
                                        'A'
                                    )
                                        .charAt(0)
                                        .toUpperCase()}

                                </div>

                                <div>
                                    <h3>
                                        {
                                            comment.name ||
                                            'Anonymous'
                                        }
                                    </h3>

                                    {comment.created_at && (

                                        <time>

                                            {new Date(
                                                comment.created_at
                                            ).toLocaleDateString(
                                                'en-ZA',
                                                {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                }
                                            )}

                                        </time>
                                    )}

                                </div>
                            </div>

                            <p className="comment-content">
                                
                                {
                                    comment.content
                                }
                            </p>

                        </article>
                    ))
                )}
            </div>
        </section>
    );
}

export default Comments;