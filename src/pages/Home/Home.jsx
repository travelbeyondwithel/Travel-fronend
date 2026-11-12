import { useState, useEffect } from 'react';
import useHome from '../../hooks/useHome';

import PopularArticles from '../../components/home/PopularArticles';

import { getHero, getUpcomingEvents } from '../../api/articleApi';

import Hero from '../../components/home/Hero';
import FeaturedArticles from '../../components/home/FeaturedArticles';
import LatestArticles from '../../components/home/LatestArticles';

import UpcomingEvents from '../../pages/Events/UpcomingEvents';
import DestinationsHome from '../Destinations/DestinationsHome';

import '../../styles/FeaturedArticles.css';
import '../../styles/home.css';


function Home() {

    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [hero, setHero] = useState(null);

    const{

        homeData,

        loading,

        error
    }=useHome();

    // Fetch upcoming events
    useEffect(() => {

        const fetchUpcomingEvents = async () => {

            try{
                const response = await getUpcomingEvents();

                const events = response.data.results || response.data;
                const heroResponse = await getHero();

                // console.log('Event Api Response:', response.data);
    
                // setUpcomingEvents(response.data.results || response.data);

                setUpcomingEvents(events);
                setCurrentEventIndex(0);
                setHero(heroResponse.data)

            } catch (error) {
                console.error(
                    'Failed to load upcoming events:',
                    error
                );
                setUpcomingEvents([])
            }
        };

        fetchUpcomingEvents();
    }, []);

    // Rotate event every 2 minutes
    useEffect(() => {

        if (upcomingEvents.length <= 1) {
            return
        }

        const interval = setInterval(() => {

            setCurrentEventIndex((previousIndex) => (
                (previousIndex + 1) % upcomingEvents.length
            ));
        }, 120000); // 2 minutes

        return () => clearInterval(interval);
    }, [upcomingEvents]);

    // console.log('Upcoming events state:', upcomingEvents);

    return (
        <main>
            
            <div className="home">

                <div className='hero-wrapper'>
                    
                    <Hero article={hero?.article}/>

                    {upcomingEvents?.length > 0 && (
                        <UpcomingEvents 
                            key={upcomingEvents[currentEventIndex].id}
                            event={upcomingEvents[currentEventIndex]}
                        />
                    )}
                </div>

            </div>

            <FeaturedArticles
                featured={homeData?.featured || []}
                articles={homeData?.latest || []}
            />

            <PopularArticles
                articles={homeData?.popular || []}
            />

            <DestinationsHome />

            <LatestArticles
                // articles={homeData?.latest.slice(3) || []}
                articles={homeData?.latest || []}
            />

            
        </main>
    )
}

export default Home;
