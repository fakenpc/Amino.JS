console.log("Get online users\n");
const env = require('./env');
const Amino = require('../index');
(async function(){
    const sid = await Amino.login(env.email, env.password);
    const yourCommunities = await Amino.getJoinedComs();
    let communityId;
    let onlineUsers;

    for(const yourCommunity of yourCommunities.coms) {
    	if(yourCommunity.id == "x156542274") {
    		communityId = "x156542274"; // russian anime community 
    	}
    }

    if(!communityId) {
    	communityId = yourCommunities.coms[0].id;
    }

    let offset = 0;
    let size = 100;

    do {
    	onlineUsers = await Amino.getOnlineUsers(communityId, offset, size);

	    for (const user of onlineUsers.userProfileList) {
	    	console.log(user.nickname + " [" + user.address + "]");
	    }

	    offset += size;
    }while(onlineUsers.userProfileList.length);

})();