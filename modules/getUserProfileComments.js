const fetch = require('isomorphic-fetch'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const sorter = require('../helpers/sorter.js'); //For easier Sorting of various Responses.
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const {
    getConfig
} = require('../index');

/**
 * Get all the comments from a user profile post
 * @param {CommunityUUID} com A ID that can be obtained by the function getJoinedComs
 * @param {uid} com A ID that can be obtained by the function getJoinedComs
 * @param {String} start Were comment number to start fetching
 * @param {String} size The size of comments to fetch
 * @returns {Object} Object where all the Comments that the User has are contained in an Array.
 */

module.exports = async function getUserProfileComments(com, uid, start = 0, size = 15) {
    let comments = objs.comments;
    let body;
    const sid = getConfig('sid');

    if (typeof sid != 'string' || typeof com !== 'string' || typeof uid !== 'string' || typeof start !== 'number' || typeof size !== 'number') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        const response = await fetch(endpoints.getUserProfileComments(com, uid, start, size), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        //Parsing the Response.
        body = await response.json();
        body.commentList.forEach(commentsR => {
            comments.comments.push(sorter.commentSorter(commentsR));
        });
        comments.status = 'ok';
        comments.error = null;
    } catch (err) {
        comments.error = err;
        throw 'Error while calling getUserProfileComments: ' + err;
    }
    return comments;
};