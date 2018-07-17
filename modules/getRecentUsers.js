const { getConfig } = require('../index');
const objs = require('../helpers/objects.js');
const request = require('request-promise');
const endpoints = require('../helpers/endpoints');
const sorter = require('../helpers/sorter');
module.exports = async function (com, start=0, size=1) {

    // get our sid
    let recentUsers = objs.recentUsers;
    recentUsers.userProfileList = [];
    let sid = getConfig('sid');
    
    if (typeof sid != 'string' || typeof com !== 'string' || typeof start !== 'number' || typeof size !== 'number') {
        throw new Error('All Arguments are not satisfied. Check if all parameters are the right type.');
    }
    
    try {
        var result = await request.get(endpoints.getRecentUsers(com, start, size), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });

        // Parse and return the userProfileList
        jsonUsers = JSON.parse(result);
        jsonUsers.userProfileList.forEach(element => {
            recentUsers.userProfileList.push(sorter.userSorter(element));
        });
        recentUsers.userProfileCount = jsonUsers.userProfileCount;
        recentUsers.status = 'ok';
        recentUsers.error = null;
    } catch (err) {
        recentUsers.error = err;
        throw new Error(err);
    }
    return recentUsers;
};