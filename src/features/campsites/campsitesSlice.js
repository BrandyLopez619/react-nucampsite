// for any file that does not export a react component the filename must start with lowercase
// be in plural. Ex:  campsitesSlice.js    istead of react components:   CampsiteSlice.js

import { CAMPSITES } from '../../app/shared/CAMPSITES';

export const selectAllCampsites = () => {
    return CAMPSITES;
}

export const selectRandomCampsite = (CAMPSITES) => {
    return Math.floor(Math.random() * CAMPSITES.length);  // my code
    // return CAMPSITES[Math.floor(CAMPSITES.length * Math.random())]; // answer

}