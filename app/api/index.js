/*
**	API分发服务器
*/
module.exports = (url)=>{
	let apiMap = {
		"/user.action":{
			"id":1,
			"name":"李华",
			"age":18,
			"school":"红星中学"
		},
		"/list.action":["first-blood",'double-kill','holy-shit']
	};
	return Promise.resolve(apiMap[url]);
};