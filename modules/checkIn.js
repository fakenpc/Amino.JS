const fetch = require('isomorphic-fetch'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const sorter = require('../helpers/sorter.js'); //For easier Sorting of various Responses.
const { getConfig } = require('../index');

/** 
 * Function to like a blog.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the Function getJoinedComs
 * @param {String} id The id of the blog
 * @returns {Object} The raw JSON parsed from Amino API
 */

module.exports = async function checkIn(com) {
    const sid = getConfig('sid');
    let checkIn = objs.checkIn;
    if (typeof com !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        let response = await fetch(endpoints.checkIn(com), {
            method: 'POST',
            headers: {
                'NDCAUTH': `sid=${sid}`
            },
            body: JSON.stringify({
                'timestamp': new Date().getUTCMilliseconds(),
                'timezone': 180
            })
        });
        response = await response.json();

        if (response['api:message'] == 'OK') {
            checkIn.status = 'ok';
            checkIn.error = null;
        } else {
            checkIn.error = response['api:message'];
        }
    } catch (err) {
        checkIn.error = err;
        throw 'Error while calling likeBlog: ' + err;
    }
    return checkIn;
};