console.log("Like a post.\n");
const env = require('./env');
const Amino = require('../index');
(async function () {
    const sid = await Amino.login(env.email, env.password);
    const yourCommunities = await Amino.getJoinedComs();
    let community;

    for(const yourCommunity of yourCommunities.coms) {
    	if(yourCommunity.id == "x156542274") {
    		community = "x156542274"; // russian anime community 
    	}
    }

    if(!community) {
    	community = yourCommunities.coms[0].id;
    }
    
    let recentBlogs = await Amino.getComBlogFeed(community, 0, 100);

    console.log(recentBlogs);

    for (const someBlog of recentBlogs.blogs) {
    	if(!someBlog.liked) {
    		console.log(await Amino.likeBlog(community, someBlog.blogId));
    	}
    }
    
})();