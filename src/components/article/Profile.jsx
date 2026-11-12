import { useEffect, useState } from "react"; 
import { getProfile } from "../../api/articleApi"; 
import "../../styles/Profile.css"; 

import { Link } from "react-router-dom";

import {
    FaLinkedinIn,
    FaFacebookF,
    FaPinterestP,
    FaInstagram,
} from 'react-icons/fa6';

function Profile() { 
    const [profile, setProfile] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(false); 
    
    useEffect(() => { 
        const fetchProfile = async () => { 
            try { 
                const response = await getProfile(); 
                setProfile(response.data); 
            } catch (error) { 
                console.error("Error fetching profile:", error); 
                setError(true);
            } finally { 
                setLoading(false); 
            } 
        }; 
        
        fetchProfile(); 
    }, []);
    
    if (loading) { 
        return null; 
    } 
    
    if (error || !profile) {
        return null; 
    }
    
    return ( 
        
        <section className="profile"> 
            
            {/* Profile photo & Name */}
            <div className="side_by_side">
            {/* Profile photo */}
                {profile.photo && ( 
                    <div className="profile-image-wrapper"> 
                        <img 
                            src={profile.photo} 
                            alt={profile.name} 
                            className="profile-image" 
                        /> 
                    </div>
                )} 
                <div className="profile-wrapper">
                    {profile.name && ( 
                        <h2 className="profile-name"> 
                            Meet {profile.name} 
                        </h2> 
                    )} 
                    
                    {profile.role && ( 
                        <p className="profile-role"> 
                            {profile.role} 
                        </p> 
                    )} 
                </div>
            </div> 
            
            {/* Profile information */} 
            <div className="profile-content"> 
                
                {profile.tagline && ( 
                    <p className="profile-tagline"> 
                        {profile.tagline} 
                    </p> 
                )} 

                {profile.bio && ( 
                    <p className="profile-bio"> 
                        {profile.bio} 
                    </p> 
                )} 

            <Link
                to={'about/'}
                className="profile-read-more"
            >
                Read More
            </Link>
                
                {/* Social links */} 
                <div className="profile-socials"> 
                    {profile.facebook && ( 
                        <a 
                            href={profile.facebook} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="Facebook" 
                        > 
                            <FaFacebookF />
                        </a> 
                    )} 
                    
                    {profile.instagram && ( 
                        <a 
                            href={profile.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="Instagram" 
                        > 
                            <FaInstagram />
                        </a> 
                    )} 
                    
                    {profile.pinterest && ( 
                        <a 
                            href={profile.pinterest}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="pinterest" 
                        > 
                            <FaPinterestP />
                        </a> 
                    )} 

                    {profile.linkedin && ( 
                        <a 
                            href={profile.linkedin}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="LinkedIn" 
                        > 
                            <FaLinkedinIn /> 
                        </a> 
                    )} 
                </div> 
            </div> 
        </section> 
    ); 
} 

export default Profile; 