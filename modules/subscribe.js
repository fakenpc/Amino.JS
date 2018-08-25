const fetch = require('isomorphic-fetch'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const sorter = require('../helpers/sorter.js'); //For easier Sorting of various Responses.
const { getConfig } = require('../index');

/** 
 * Function to subscribe.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the Function getJoinedComs
 * @param {String} uid The id of the Amino user
 * @returns {Object} The raw JSON parsed from Amino API
 */

module.exports = async function subscribe(com, uid) {
    const sid = getConfig('sid');
    let subscribe = objs.subscribe;
    if (typeof com !== 'string' || typeof uid !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        let response = await fetch(endpoints.subscribe(com, uid), {
            method: 'POST',
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        response = await response.json();

        if (response['api:message'] == 'OK') {
            subscribe.status = 'ok';
            subscribe.error = null;
        }
    } catch (err) {
        subscribe.error = err;
        throw 'Error while calling subscribe: ' + err;
    }
    return subscribe;
};