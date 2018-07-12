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

module.exports = async function likeBlog(com, id) {
    const sid = getConfig('sid');
    let likeBlog = objs.likeBlog;
    if (typeof com !== 'string' || typeof id !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        let response = await fetch(endpoints.likeBlog(com, id), {
            method: 'POST',
            headers: {
                'NDCAUTH': `sid=${sid}`
            },
            body: JSON.stringify({
                'eventSource':'FeedList',
                'timestamp': new Date().getUTCMilliseconds(),
                'value': 4
            })
        });
        response = await response.json();

        console.log(response);

        if (response['api:message'] == 'OK') {
            likeBlog.status = 'ok';
            likeBlog.error = null;
        }
    } catch (err) {
        likeBlog.error = err;
        throw 'Error while calling likeBlog: ' + err;
    }
    return likeBlog;
};