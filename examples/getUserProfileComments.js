console.log("Get comments from your wall\n");
const env = require('./env');
const Amino = require('../index');
(async function(){
    const sid = await Amino.login(env.email, env.password);
    const yourCommunities = await Amino.getJoinedComs();
    let communityId;
    const myProfile = await Amino.getMyProfile();
    const myUserId = myProfile.account.uid;

    for(const yourCommunity of yourCommunities.coms) {
    	if(yourCommunity.id == "x156542274") {
    		communityId = "x156542274"; // russian anime communityId 
    	}
    }

    if(!communityId) {
    	communityId = yourCommunities.coms[0].id;
    }

    let userProfileComments = await Amino.getUserProfileComments(communityId, myUserId, 0, 15);

    console.log(userProfileComments);

})();