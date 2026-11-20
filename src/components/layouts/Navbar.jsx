import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../styles/Navbar.css';

import MobileMenu from './MobileMenu';

import { 
    FaMagnifyingGlass, 
    FaX,
    FaInstagram,
    FaYoutube,
    FaTiktok,
    FaPinterest,
} from 'react-icons/fa6';

import { searchSite } from '../../api/articleApi';

function Navbar() {

    const navigate = useNavigate();

    const [searchOpen, setSearchOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const [searchResults, setSearchResults] = useState([]);

    const [searchLoading, setSearchLoading] = useState(false);

    const [searchError, setSearchError] = useState('');

    const searchInputRef = useRef(null);

    /*
    ==========================================
    OPEN / CLOSE SEARCH
    ==========================================
    */

    const handleSearch = () => {

        setSearchOpen(prev => !prev);

    };

    /*
    ==========================================
    FOCUS SEARCH INPUT
    ==========================================
    */

    useEffect(() => {

        if (searchOpen) {

            setTimeout(() => {

                searchInputRef.current?.focus();

            }, 0);

        }

    }, [searchOpen]);

    /*
    ==========================================
    SEARCH DJANGO API
    ==========================================
    */

    useEffect(() => {

        const query = searchQuery.trim();

        if (!query) {

            setSearchResults([]);

            setSearchError('');

            return;

        }

        if (query.length < 2) {

            setSearchResults([]);

            setSearchError('');

            return;

        }

        const timer = setTimeout(
            async () => {

                try {

                    setSearchLoading(true);

                    setSearchError('');

                    const response =
                        await searchSite(query);

                    setSearchResults(
                        response.data.results || []
                    );

                }

                catch (error) {

                    console.error(
                        'Search failed:',
                        error
                    );

                    setSearchError(
                        'Unable to search right now.'
                    );

                    setSearchResults([]);

                }

                finally {

                    setSearchLoading(false);

                }

            },
            400
        );

        return () => {

            clearTimeout(timer);

        };

    }, [searchQuery]);

    /*
    ==========================================
    SELECT SEARCH RESULT
    ==========================================
    */

    const handleResultClick = (result) => {

        setSearchOpen(false);

        setSearchQuery('');

        setSearchResults([]);

        if (result.type === 'article') {

            navigate(
                `/articles/${result.slug}`
            );

            return;

        }

        if (result.type === 'travel_guide') {

            navigate(
                `/travel-guide/${result.slug}`
            );

            return;

        }

        if (result.type === 'event') {

            navigate(
                `/events/${result.slug}`
            );

            return;

        }

        if (result.type === 'destination') {

            navigate(
                `/destinations/${result.slug}`
            );

        }

    };

    return (

        <header className='navbar'>

            {/* Top Header */}
            <div className='nav-container'>

                <div className="navbar-top">
                    
                    {/* ==================================
                        LOGO
                    ================================== */}

                    <Link
                        to="/"
                        className='navbar-logo'
                    >
                        <span className="logo-main">
                            Travel Beyond 
                        </span>

                        <span className='logo-script'> 
                            with El
                        </span>
                    </Link>

                </div>


                {/* ==================================
                    DESKTOP NAVIGATION
                ================================== */}
                <div className="navbar-bottom">

                    {/* SOCIAL MEDIA */}
                    <div className="navbar-socials">

                        <a href="https://www.instagram.com/travelbeyondwithel/" target="_blank" aria-label="Instagram">
                            <FaInstagram />
                        </a>

                        <a href="https://www.youtube.com/@travelbeyondwithel" target="_blank" aria-label="YouTube">
                            <FaYoutube />
                        </a>

                        <a href="https://www.tiktok.com/@travelbeyondwithel" target="_blank" aria-label="TikTok">
                            <FaTiktok />
                        </a>

                        <a href="https://www.pinterest.com/travelbeyondwithel/" target="_blank" aria-label="Pinterest">
                            <FaPinterest />
                        </a>

                    </div>

                        <nav className="main-navigation">

                            <ul>

                                <li>
                                    <Link to='/'>
                                        Home
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/Blog'>
                                        Blog
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/travel-guide'>
                                        Travel Guide
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/resources'>
                                        Travel Resources
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/destinations'>
                                        Destinations
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/events'>
                                        Events
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/about'>
                                        About
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/contact'>
                                        Contact
                                    </Link>
                                </li>

                            </ul>

                        </nav>
                        <div className="flex-wrap">
                        {/* ==================================
                            MOBILE MENU
                        ================================== */}
                        <MobileMenu />

                        {/* ==================================
                            SEARCH BUTTON
                        ================================== */}
                        

                            <Link
                                className='navbar-search'
                                type='button'
                                aria-label='Search'
                                aria-expanded={searchOpen}
                                onClick={handleSearch}
                            >

                                <FaMagnifyingGlass />
                                <span> Search </span>
                            </Link>

                        </div>

                    </div>


                {/* ======================================
                    SEARCH PANEL
                ====================================== */}

                {searchOpen && (

                    <div className='search-panel'>

                        <div className='search-container'>

                            {/* SEARCH INPUT */}

                            <div className='search-input-wrapper'>

                                <FaMagnifyingGlass />

                                <input
                                    ref={searchInputRef}
                                    type='search'
                                    value={searchQuery}
                                    onChange={(event) =>
                                        setSearchQuery(
                                            event.target.value
                                        )
                                    }
                                    placeholder='Search articles, destinations, events...'
                                    aria-label='Search'
                                />

                                {searchQuery && (

                                    <button
                                        type='button'
                                        className='search-clear'
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSearchResults([]);
                                        }}
                                        aria-label='Clear search'
                                    >
                                        {/* × */}<FaX />
                                    </button>

                                )}

                            </div>

                            {/* SEARCH STATUS */}

                            {searchLoading && (

                                <div className='search-message'>
                                    Searching...
                                </div>

                            )}

                            {searchError && (

                                <div className='search-message search-error'>
                                    {searchError}
                                </div>

                            )}

                            {!searchLoading &&
                                !searchError &&
                                searchQuery.trim().length === 1 && (

                                    <div className='search-message'>
                                        Type at least 2 characters.
                                    </div>

                                )
                            }

                            {/* RESULTS */}

                            {!searchLoading &&
                                searchQuery.trim().length >= 2 &&
                                searchResults.length > 0 && (

                                    <div className='search-results'>

                                        {searchResults.map(
                                            (result) => (

                                                <button
                                                    key={`${result.type}-${result.id}`}
                                                    type='button'
                                                    className='search-result'
                                                    onClick={() =>
                                                        handleResultClick(
                                                            result
                                                        )
                                                    }
                                                >

                                                    <div className='search-result-type'>

                                                        {result.type === 'article' &&
                                                            'Article'
                                                        }

                                                        {result.type === 'travel_guide' &&
                                                            'Travel Guide'
                                                        }

                                                        {result.type === 'event' &&
                                                            'Event'
                                                        }

                                                        {result.type === 'destination' &&
                                                            'Destination'
                                                        }

                                                    </div>

                                                    <div className='search-result-title'>

                                                        {result.title}

                                                    </div>

                                                    {result.introduction && (

                                                        <div className='search-result-introduction'>

                                                            {result.introduction}

                                                        </div>

                                                    )}

                                                </button>

                                            )
                                        )}

                                    </div>

                                )
                            }


                            {/* NO RESULTS */}

                            {!searchLoading &&
                                !searchError &&
                                searchQuery.trim().length >= 2 &&
                                searchResults.length === 0 && (

                                    <div className='search-message'>

                                        No results found.

                                    </div>

                                )
                            }

                        </div>

                    </div>

                )}
                </div>

                
                    
            

        </header>

    );

}

export default Navbar;