import API from './api';

export const submitPartnerApplication = (formData) =>
    API.post('partner-submissions/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

export const getTravelSupport = () =>
    API.get('support/');