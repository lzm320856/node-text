/*
**	API静态数据分发服务器
*   只处理后缀为.action的请求，通过不同情况给res.ctx赋值
*/
module.exports = (ctx)=>{
	let { reqCtx,resCtx,res} = ctx;
	let {url,method} = ctx.req;
	method = method.toLowerCase();
	let apiMap = {
		"/user.action":{
			"id":1,
			"name":"赵日天",
			"age":18,
			"school":"断罪小学"
		},
		"/list.action":["first-blood",'double-kill','holy-shit']
	};

	if(url.match('.action')){
		if(method == "get"){
			resCtx.body = JSON.stringify(apiMap[url]);
		}else if(method == "post"){
			let data = reqCtx.body;
			data.code == '101' ? resCtx.body = JSON.stringify(apiMap[url]) : resCtx.body = "no resource";
		}
		res.setHeader("Content-Type","application/json");
	}

	return Promise.resolve();
};