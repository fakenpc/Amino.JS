console.log("Get online users\n");
const env = require('./env');
const Amino = require('../index');
(async function(){
    const sid = await Amino.login(env.email, env.password);
    const yourCommunities = await Amino.getJoinedComs();
    let community;
    let onlineUsers;

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
    	onlineUsers = await Amino.getOnlineUsers(community, offset, size);

	    for (const user of onlineUsers.userProfileList) {
	    	console.log(user.nickname + " [" + user.address + "]");
	    }

	    offset += size;
    }while(onlineUsers.userProfileList.length);

})();