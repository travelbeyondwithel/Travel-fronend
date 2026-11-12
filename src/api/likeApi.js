import API from './articleApi';

import { getBrowserId } from '../utils/browserId';


export async function likeArticle(slug){

    return await API.post(
        `articles/${slug}/like/`,
        {},
        {
            headers: {
                'X-Browser-ID': getBrowserId(),
            }
        }
    );
}


export async function getLikeStatus(slug) {
    
    return await API.get(
        `articles/${slug}/like-status/`,
        {
            headers: {
                'X-Browser-ID': getBrowserId(),
            }
        }
    );
}
