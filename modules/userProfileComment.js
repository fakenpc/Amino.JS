const fetch = require('isomorphic-fetch'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const { getConfig } = require('../index');
const sorter = require('../helpers/sorter');

/** 
 * Function to post a comment at the user wall.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the Function getJoinedComs
 * @param {UserUUID} uid The ID of the user
 * @param {String} content The content of the comment.
 * @param {Array} Amino api mediaList raw data. Don't ready to use at this moment. 
 * @returns {Object} The raw JSON parsed from Amino API
 */

module.exports = async function userProfileComment(com, uid, content, mediaList = []) {
    const sid = getConfig('sid');
    let comment;
    if (typeof sid != 'string' || typeof com !== 'string' || typeof uid !== 'string' || typeof content !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        let response = await fetch(endpoints.userProfileComment(com, uid), {
            method: 'POST',
            headers: {
                'NDCAUTH': `sid=${sid}`
            },
            body: JSON.stringify({
                'content': content,
                'mediaList': mediaList, // TODO: add uploading images
                'stickerId': null,
                'eventSource':'UserProfileView',
                'timestamp': new Date().getUTCMilliseconds(),
                'type': 0
            })
        });
        response = await response.json();
        if (response.comment) {
            comment = sorter.commentSorter(response.comment);
        } else {
            return response;
        }
    } catch (err) {
        throw 'Error while calling userProfileComment: ' + err;
    }
    return comment;
};