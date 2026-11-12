import { useEffect, useState } from "react";
import { getComments } from "../api/commentApi";

export default function useComments(articleId) {

    const [comments, setComments] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchComments() {

            try {

                const response = await getComments(articleId);

                setComments(response.data)

            }

            finally {
                setLoading(false);

            }

        }

        fetchComments();

    }, [articleId]);

    return {

        comments,

        loading,

    };

}