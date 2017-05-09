/*
**处理request的信息，将post的信息存入request.context中
 */
const Url = require('url');

let urlParser = (ctx)=>{
	let {req,reqCtx} = ctx;
	let {url,method} = req;
	method = method.toLowerCase();
	reqCtx.pathname = Url.parse(url).pathname;
	reqCtx.query = Url.parse(url,true).query;
	return Promise.resolve({
		then:(resolve,reject)=>{
			reqCtx.method = method;
			if(method == "post"){
				let data = [];
				req.on('data',(chunk)=>{
					data.push(chunk);
				}).on('end',()=>{
					let endData = Buffer.concat(data).toString();
					reqCtx.body = JSON.parse(endData);
					resolve();
				})
			}else if(method == 'get'){
				resolve();
			}
		}
	});
	// 处理 =》 只通知promise成功，若为get将query存入reqCtx的query中,若为post将data存入reqCtx的body中
};

module.exports = urlParser;