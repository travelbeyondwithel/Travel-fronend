// import { useEffect, useState } from "react";
// import { getComments } from "../../api/commentApi";

// import useComments from "../../hooks/useComments";
import { FaCommentDots } from "react-icons/fa6";


function CommentCount({ comments = [] }) {

    // console.log('COMMENT COUNT RECEIVED:', comments)

    return (

        <section className="commentCount">

            <div className="comments-header">

                <div className="comments-title">

                    {/* <FaRegComment /> */}
                    <FaCommentDots />

                    <h2>
                        Comments
                    </h2>

                    {/* <span className="comments-count">
                        {comments.length}
                    </span> */}

                    <span className="comments-count">
                        {comments.length}
                    </span>

                </div>
            </div>

        </section>
    );
}

export default CommentCount;
