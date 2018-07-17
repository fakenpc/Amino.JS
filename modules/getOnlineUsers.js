const { getConfig } = require('../index');
const objs = require('../helpers/objects.js');
const request = require('request-promise');
const endpoints = require('../helpers/endpoints');
const sorter = require('../helpers/sorter');
module.exports = async function (com, start=0, size=1) {

    // get our sid
    let onlineUsers = objs.users;
    onlineUsers.userProfileList = [];
    let sid = getConfig('sid');
    
    if (typeof sid != 'string' || typeof com !== 'string' || typeof start !== 'number' || typeof size !== 'number') {
        throw new Error('All Arguments are not satisfied. Check if all parameters are the right type.');
    }
    
    try {
        var result = await request.get(endpoints.getOnlineUsers(com, start, size), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });

        // Parse and return the userProfileList
        jsonUsers = JSON.parse(result);
        jsonUsers.userProfileList.forEach(element => {
            onlineUsers.userProfileList.push(sorter.userSorter(element));
        });
        onlineUsers.userProfileCount = jsonUsers.userProfileCount;
        onlineUsers.status = 'ok';
        onlineUsers.error = null;
    } catch (err) {
        onlineUsers.error = err;
        throw new Error(err);
    }
    return onlineUsers;
};