console.log("Get recent users\n");
const env = require('./env');
const Amino = require('../index');
(async function(){
    const sid = await Amino.login(env.email, env.password);
    const yourCommunities = await Amino.getJoinedComs();
    let community;
    let recentUsers;

    for(const yourCommunity of yourCommunities.coms) {
    	if(yourCommunity.id == "x156542274") {
    		community = "x156542274"; // russian anime community 
    	}
    }

    if(!community) {
    	community = yourCommunities.coms[0].id;
    }

    let offset = 0;
    let size = 100;

    do {
    	recentUsers = await Amino.getRecentUsers(community, offset, size);

	    for (const user of recentUsers.userProfileList) {
	    	console.log(user.nickname + " [" + user.address + "]");
	    }

	    offset += size;
    }while(recentUsers.userProfileList.length);

})();