

import '../../styles/articleBody.css';


function ArticleBody({ article }){

    if (!article) {
        return null;
    }

    // console.log(article);

    return (
        <section className="article-body">

            {/* // <div className='article-introduction'>

            //     {/* <p>
            //         {article.introduction}
            //     </p>}

            // </div> */}

            {article.content && (
                <div 
                    className="article-content-body"
                    dangerouslySetInnerHTML={{
                        __html: article.content
                    }}
                />
            )}

        </section>
    )

    
}

export default ArticleBody;


