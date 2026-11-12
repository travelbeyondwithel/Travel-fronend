import API from './articleApi';

export async function postComment(data){

    return await API.post(
        'comments/',

        data
    );
}

export async function getComments(articleSlug){

    return await API.get(
        `articles/${articleSlug}/comments/`
    );
}

export async function addComment(data){

    // if (!slug) {
    //     throw new Error(
    //         'Article slug is required.'
    //     );
    // }

    console.log(
        'DATA BEING SENT TO DJANGO:',
        data
    )

    return await API.post(
        'comments/',

        data
    );
}