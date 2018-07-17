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

module.exports = async function checkInLottery(com) {
    const sid = getConfig('sid');
    let checkInLottery = objs.checkInLottery;
    if (typeof com !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        let response = await fetch(endpoints.checkInLottery(com), {
            method: 'POST',
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        response = await response.json();

        if (response['api:message'] == 'OK') {
            checkInLottery.status = 'ok';
            checkInLottery.error = null;
        } else {
            checkInLottery.error = response['api:message'];
        }
    } catch (err) {
        checkInLottery.error = err;
        throw 'Error while calling likeBlog: ' + err;
    }
    return checkInLottery;
};