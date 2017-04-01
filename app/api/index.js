/*
**	API分发服务器
*/
module.exports = (request)=>{
	let {url,method,context} = request;
	method = method.toLowerCase();
	let apiMap = {
		"/user.action":{
			"id":1,
			"name":"李华",
			"age":18,
			"school":"红星中学"
		},
		"/list.action":["first-blood",'double-kill','holy-shit']
	};
	if(method == "get"){
		return Promise.resolve(apiMap[url]);
	}else if(method == "post"){
		return new Promise((resolve,reject)=>{
			let data = context.body;
			data.code == '101' ? resolve(apiMap[url]) : resolve("forbidden");
		})
	}
};