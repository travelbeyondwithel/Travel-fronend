import '../../styles/ArticleLayout.css';

import ShareBar from './ShareBar';
import RelatedArticles from './RelatedArticles';
import Profile from './Profile';

function ArticleLayout({

    article,

    relatedArticles,

    children
}) {

    return (

        <section className="article-layout">

            <main className='article-main'>

                {children}

            </main>

            <aside className="article-sidebar">

                <Profile />

                <ShareBar article={article} />

                <RelatedArticles
                    articles={relatedArticles}
                />

            </aside>

        </section>
    )
}

export default ArticleLayout;