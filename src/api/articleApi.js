import axios from 'axios';

import { getBrowserId } from '../utils/browserId';

const API = axios.create({

    baseURL: 'http://travel-backend-pvq4.onrender.com/api/'
    // baseURL: 'http://127.0.0.1:8000/api/'

});



// ==========================
// Get all articles
// ==========================
export async function getArticles () {
    return await API.get('articles/');
};


export const getArticle = (slug) => {

    return API.get(
        `articles/${slug}/`,
        {
            headers: {
                'X-Browser-ID': getBrowserId(),
            },
        }
    );
};


// ==========================
// Get all articles based on countries
// ==========================
export const getSubcategoryArticles = async (slug) => {

    return await API.get(
        `articles/subcategory/${slug}/`
    );
};




// ==========================
// Resolver
// ==========================

// export async function resolveArticleSlug () {
//     return await API.get('articles/resolve/');
// };


export const resolveArticleSlug = (slug) => {

    return API.get(
        `articles/resolve/${slug}/`,
        {
            headers: {
                'X-Browser-ID': getBrowserId(),
            },
        }
    );
};


// ==========================
// Destination Directory
// ==========================
export async function getDestinationDirectory() {

    return await API.get(
        `destinations/directory/`
    );
};



// ==========================
// Get all destinations
// ==========================
export async function getDestinations () {
    return await API.get('destinations/');
};


export const getDestination = (slug) => {

    return API.get(
        `destinations/${slug}/`,
        {
            headers: {
                'X-Browser-ID': getBrowserId(),
            },
        }
    );
};

// ==========================
// Get all travel guides
// ==========================
export async function getTravelGuides () {
    return await API.get('travel-guides/');
};


export const getTravelGuide = (slug) => {

    return API.get(
        `travel-guides/${slug}/`,
        {
            headers: {
                'X-Browser-ID': getBrowserId(),
            },
        }
    );
};


// ==========================
// Get all events
// ==========================
export async function getUpcomingEvents () {
    return API.get('events/upcoming/');
}


// ==========================
// Get all events
// ==========================
export async function getEvents () {
    return await API.get('events/');
};


export const getEvent = (slug) => {

    return API.get(
        `events/${slug}/`,
        {
            headers: {
                'X-Browser-ID': getBrowserId(),
            },
        }
    );
};


// ==========================
// Toggle Article
// ==========================
export const toggleArticleLike = (slug) => {

    return API.post(
        `articles/${slug}/like/`,
        {},
        {
            headers: {
                'X-Browser-ID': getBrowserId(),
            },
        }
    );
};


// ==========================
// Profile
// ==========================
export async function getProfile() {
    return await API.get('profile/');
};


// ==========================
// About
// ==========================
export async function getAbout() {
    return await API.get('about/');
};


// ==========================
// Contact
// ==========================
export async function getContact() {
    return await API.get('contact/');
};


// ==========================
// search site
// ==========================
export const searchSite = (query) => {
    const params = new URLSearchParams({
        q: query.trim(),
    });
    return API.get(`search/?${params.toString()}`);
};




// ==========================
// Article Tracking
// ==========================
export const startArticleVisit = (slug, visitToken) => {
    return API.post(
        `articles/${slug}/visit/start/`,
        {
            visit_token: visitToken,
        }
    );
};


export const endArticlesVisit = (visitId) => {
    return API.post(
        `articles/visits/${visitId}/end/`
    );
};




// ==========================
// END Article Visit with send beacon
// ==========================
export const endArticlesVisitBeacon = (visitId, visitToken) => {
    if (!visitId || !visitToken) {
        return false;
    }

    const url =
        `${API.defaults.baseURL}articles/visits/${visitId}/end/`;

    const blob = new Blob(
        [
            JSON.stringify({
                visit_token: visitToken,
            })
        ],
        {
            type: "application/json",
        }
    );

    return navigator.sendBeacon(url, blob);
};



// ==========================
// Heo
// ==========================
export const getHero = () => 
    API.get('hero/');


export default API;