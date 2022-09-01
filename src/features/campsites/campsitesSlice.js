import { CAMPSITES } from '../../app/shared/CAMPSITES';

export const selectAllCampsites = () => {
    return CAMPSITES;
};
export const selectCampsiteById = (id) => {
    return CAMPSITES.find((campsite) => campsite.id === parseInt(id));
};
export const selectRandomCampsite = () => {
    return CAMPSITES[Math.floor(CAMPSITES.length * Math.random())];
};
export const selectFeaturedCampsite = () => {
    return CAMPSITES.find((campsite) => campsite.featured);
};

// for any file that does not export a react component the filename must start with lowercase
// be in plural. Ex:  campsitesSlice.js    istead of react components:   CampsiteSlice.js