const fetch = require('isomorphic-fetch'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const sorter = require('../helpers/sorter.js'); //For easier Sorting of various Responses.
const { getConfig } = require('../index');

/** 
 * Function to unsubscribe.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the Function getJoinedComs
 * @param {String} uid The id of the Amino user
 * @param {String} myUid The id of the account owner Amino user
 * @returns {Object} The raw JSON parsed from Amino API
 */

module.exports = async function unsubscribe(com, uid, myUid) {
    const sid = getConfig('sid');
    let unsubscribe = objs.unsubscribe;
    if (typeof com !== 'string' || typeof uid !== 'string' || typeof myUid !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        let response = await fetch(endpoints.unsubscribe(com, uid, myUid), {
            method: 'DELETE',
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        response = await response.json();

        if (response['api:message'] == 'OK') {
            unsubscribe.status = 'ok';
            unsubscribe.error = null;
        }
    } catch (err) {
        unsubscribe.error = err;
        throw 'Error while calling unsubscribe: ' + err;
    }
    return unsubscribe;
};