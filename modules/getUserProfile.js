const fetch = require('isomorphic-fetch'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const sorter = require('../helpers/sorter.js'); //For easier Sorting of various Responses.
const { getConfig } = require('../index');

/**
 * Loads profile from a specific user
 * @param {CommunityUUID} com A ID that can be obtained by the function getJoinedComs
 * @param {UserUUID} uuid A ID from the user
 * @returns {Object} Object where User profile data. 
 */

module.exports = async function getUserProfile(com, uid) {
    let userProfile = objs.userProfile;
    const sid = getConfig('sid');
    if (typeof sid != 'string' || typeof com !== 'string' || typeof uid !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try{
        let response = await fetch(endpoints.getUserProfile(com, uid), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        //Parsing the Response.
        response = await response.json();

        if (response['api:message'] == 'OK') {
            if (typeof response.userProfile !== 'undefined') {
                userProfile.item = sorter.userSorter(response.userProfile);
                userProfile.status = 'ok';
                userProfile.error = null;
            }
            else {
                userProfile.status = 'not ok';
                userProfile.error = "Can't find userProfile in api response.";
            }
        } else {
            userProfile.status = 'not ok';
            userProfile.error = response['api:message'];
        }
    }
    catch(err){
        userProfile.error = err;
        throw 'Error while calling getUserBlogs: ' + err;
    }

    return userProfile;
};