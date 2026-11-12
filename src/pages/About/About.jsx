import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom"; 
import "../../styles/About.css";

import { getAbout } from "../../api/articleApi";
import { getMediaUrl } from "../../utils/mediaUrl";

function About() { 
    const [about, setAbout] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(false); 

    
    useEffect(() => { 
        const fetchAbout = async () => { 
            try { 
                const response = await getAbout();
                // console.log('ABOUT DATA:', response.data); 
                setAbout(response.data); 
            } catch (error) {
                console.error("Error fetching About content:", error); 
                setError(true); 
            } finally { 
                setLoading(false); 
            } 
        }; 
        
        fetchAbout(); 
    }, []); 
    
    if (loading) { 
        return ( 
            <main className="about-page"> 
                <section className="about-intro"> 
                    <div className="about-intro-content"> 
                        <p>Loading...</p> 
                    </div> 
                </section> 
            </main> 
        ); 
    }
    
    if (error || !about) { 
        return ( 
            <main className="about-page"> 
                <section className="about-intro"> 
                    <div className="about-intro-content"> 
                        <span className="section-label"> 
                            ABOUT US 
                        </span> 
                        
                        <h2> 
                            About information is currently unavailable. 
                        </h2> 
                        
                        <p>
                            Please check back again later. 
                        </p> 
                        
                    </div> 
                </section> 
            </main> 
        ); 
    } 

    const renderContent = (html) => {
        if (!html) return '';

        return html.replace(
            /src="([^'']+)"/g,
            (match, src) => {
                return `src="${getMediaUrl(src)}"`;
            }
        )
    }
    
    return ( 
        <main className="about-page"> 
        
            {/* Introduction */} 
            <section className="about-intro"> 
                <div className="about-intro-content"> 
                    <span className="About-label"> 
                        {about.title} 
                    </span> 
                    
                    <div 
                    className="about-content" 
                    dangerouslySetInnerHTML={{ 
                        __html: renderContent(about.content), 
                    }} 
                /> 
                </div> 
            </section> 
            
            {/* About content from CKEditor */} 
            {/* <section className="about-story-content">
                <div 
                    className="about-content" 
                    dangerouslySetInnerHTML={{ 
                        __html: renderContent(about.content), 
                    }} 
                /> 
            </section>  */}
            
            {/* CTA */} 
            <section className="about-cta">
                <span className="section-label-cta"> 
                    YOUR NEXT ADVENTURE 
                </span> 
                
                <h2> 
                    What's beyond your horizon? 
                </h2> 
                
                <p> 
                    Start exploring destinations, experiences and stories that could inspire your next journey.
                </p> 
                
                <div className="about-cta-buttons"> 
                    <Link 
                        to="/destinations" 
                        className="about-primary-button" 
                    >
                        Explore
                    </Link> 
                    
                    <Link 
                        to="/blog" 
                        className="about-secondary-button" 
                    > 
                        Read
                    </Link> 
                </div> 
            </section>
            
        </main> 
    ); 
} 

export default About; 