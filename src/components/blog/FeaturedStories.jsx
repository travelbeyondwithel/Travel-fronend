import '../../styles/featuredStories.css';

function FeaturedStories() {

    return (

        <section className='featured'>

            <h2>Featured Stories</h2>

            <div className='featured-grid'>

                <article className='featured-large'>

                    <img src="/hero.jpg" alt="featured" />

                    <div className='overlay'>

                        <span>Destination</span>

                        <h3>
                            Cape Town Beyond Table Mountain
                        </h3>

                        <p>
                            Discover hidden beaches, 
                            mountain passes and unforgettable
                            local experiences.
                        </p>

                    </div>

                </article>

                <div className='featured-right'>

                    <article>

                        <img src="/hero.jpg" alt="" />

                        <h4>
                            Best Food Market in Johannesburg
                        </h4>

                    </article>

                    <article>

                        <img src="/hero.jpg" alt="" />

                        <h4>
                            Events You Shouldn't Miss This Month
                        </h4>

                    </article>

                </div>

            </div>

        </section>
    );
}

export default FeaturedStories;