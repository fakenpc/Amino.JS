console.log("Check in.\n");
const env = require('./env');
const Amino = require('../index');
(async function () {
    const sid = await Amino.login(env.email, env.password);
    const yourCommunities = await Amino.getJoinedComs();

    for(const yourCommunity of yourCommunities.coms) {
    	let res = await Amino.checkIn(yourCommunity.id);
    	console.log(res);

    	if(res.status == 'ok' && res.canPlayLottery) {
    		let lotteryRes = await Amino.checkInLottery(yourCommunity.id);
    		console.log(lotteryRes);
    	}
    }
    
})();