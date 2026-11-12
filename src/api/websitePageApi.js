import API from "./api";

export const getWebsitePage =  (pageType) =>
    API.get(`pages/${pageType}/`);