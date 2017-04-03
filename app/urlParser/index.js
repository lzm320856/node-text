/*
**处理request的信息，将post的信息存入request.context中
 */
const querystring = require('querystring');
const Url = require('url');

let urlParser = (ctx)=>{
	let {req,reqCtx} = ctx;
	let {url,method} = req;
	method = method.toLowerCase();
	return Promise.resolve({
		then:(resolve,reject)=>{
			reqCtx.method = method;
			if(method == "post"){
				let data = '';
				req.on('data',(chunk)=>{
					data += chunk;
				}).on('end',()=>{
					reqCtx.body = JSON.parse(data);
					resolve();
				})
			}else if(method == 'get'){
				reqCtx.query = querystring.parse(Url.parse(url));
				resolve();
			}
		}
	});
	// 处理 =》 只通知promise成功，若为get将query存入reqCtx的query中,若为post将data存入reqCtx的body中
};

module.exports = urlParser;