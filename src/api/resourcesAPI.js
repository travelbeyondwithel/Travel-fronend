import API from './api';

export const getResources = () =>
    API.get('resources/');

export const getResource = (slug) =>
    API.get(`resources/${slug}/`);