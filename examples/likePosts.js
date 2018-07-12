console.log("Like a post.\n");
const env = require('./env');
const Amino = require('../index');
(async function () {
    const sid = await Amino.login(env.email, env.password);
    const yourCommunities = await Amino.getJoinedComs();
    let community;
    let recentBlogs;

    for(const yourCommunity of yourCommunities.coms) {
    	if(yourCommunity.id == "x156542274") {
    		community = "x156542274"; // russian anime community 
    	}
    }

    if(!community) {
    	community = yourCommunities.coms[0].id;
    }
    
    while (true) {
    	recentBlogs = await Amino.getComBlogFeed(community, 0, 100);
	    console.log(recentBlogs);

	    for (const someBlog of recentBlogs.blogs) {
	    	if(!someBlog.liked) {
	    		let likeBlogRes = await Amino.likeBlog(community, someBlog.blogId);
	    		console.log('like: ' + ' ' + someBlog.blogId + ' ' + someBlog.title + ' ' + likeBlogRes.status);
	    	}
	    }

		await new Promise(resolve => setTimeout(resolve, 60000));
    }
    
    
})();