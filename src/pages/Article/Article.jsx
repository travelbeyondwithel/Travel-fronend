import { useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import useArticles from "../../hooks/useArticles";

import {
    startArticleVisit,
    endArticlesVisitBeacon,
} from '../../api/articleApi';

import '../../styles/Article.css';

// import ArticleHero from "../../components/article/ArticleHero";
import ArticleBody from "../../components/article/ArticleBody";
import ArticleContent from "../../components/article/ArticleContent";
import ArticleLayout from "../../components/article/ArticleLayout";

import Statistics from "../../components/article/Statistics";



// import Hero from "../../components/home/hero";

function Article() {


    const { slug } = useParams();

    // console.log('Slug from URL:', slug);

    const {

        article,

        relatedArticles,

        subcategory,

        subcategoryArticles,

        loading,

        error

    } = useArticles(slug);

    /* ==================================
    Article Visit Tracking
    ====================================
    */ 

    const visitIdRef = useRef(null);

    const visitTokenRef = useRef(
        crypto.randomUUID()
    );

    const visitEndedRef = useRef(false);

    const endTimerRef = useRef(null);

    /* ==================================
    Start Article Visit Tracking
    ====================================
    */ 

    useEffect(() => {

        if (!slug) {
            return;
        }

        let leaving = false;

        const startVisit = async () => {

            try {

                const response = await startArticleVisit(
                    slug,
                    visitTokenRef.current
                );

                const visitId = response.data.visit_id;

                visitIdRef.current = visitId;

                // console.log(
                //     'Article visit started:',
                //     response.data
                // );

                /*
                If the user left before the start request completed, end
                the visit immediately.
                 */

                if (leaving) {
                    endArticlesVisitBeacon(
                        visitId,
                        visitTokenRef.current
                    );

                    visitEndedRef.current = true;
                }

            } catch (error) {

                console.error(
                    'Unable to start article visit:',
                    error
                );
            }
        };

        startVisit();

        return () => {

            leaving = true;
        };

    }, [slug]);

    /*
    =============================
    End Article Visit
    =============================
    */

    useEffect(() => {

        const endVisit = () => {

            if (
                visitEndedRef.current
            ) {
                return;
            }

            const visitId = visitIdRef.current;

            if (!visitId) {
                return;
            }

            visitEndedRef.current = true;

            const sent = endArticlesVisitBeacon(
                visitId,
                visitTokenRef.current
            );

            console.log(
                'Article visit ended with Beacon:',
                sent,
                'visit:',
                visitId
            );
            
        };

        /*
        ======================
        Browser page exit
        ======================
         */

        const handlePageHide = () => {

            endVisit();
        };

        window.addEventListener(
            'pagehide',
            handlePageHide
        );

        /*
        =======================
        React SPA Navigation
        =======================
         */

        return () => {

            window.removeEventListener(
                'pagehide',
                handlePageHide
            );

            /*
            Give React a tiny window to remount the component.

            This prevents React StrictMode's development cleanup
            from ending the visit immediately
             */

            endTimerRef.current = setTimeout(() => {

                endVisit();

            }, 100);

            return () => {

                clearTimeout(
                    endTimerRef.current
                )
            }

        };

    }, []);

    /*
    -----------------------------------
    LOADING
    -----------------------------------
    */

    if (loading)
        return <h1>Loading article...</h1>;
    if (error) {
        return <h2>{error}</h2>;
    }

    if (!article){
        return <h1>Article not found.</h1>;
    }


        // console.log('ARTICLE:', article);

    return (

        <main>

            <ArticleLayout

                article={article}

                relatedArticles={relatedArticles}
            >

            {/* <ArticleHero article={article} /> */}

            {/* ======================
                            Article Content
            ====================== */}

                <ArticleContent article={article} />

            {/* ======================
                            Article Body
            ====================== */}

                <ArticleBody article={article}/>

                <Statistics statistic={article} />

            </ArticleLayout>

            {/* <ArticleHero article={article}/> */}

        </main>

    );
}

export default Article;