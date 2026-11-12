import API from './articleApi';

export async function getHomeData() {

    return await API.get('home/');
}