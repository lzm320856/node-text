/*
**处理request的信息，将post的信息存入request.context中
 */
const querystring = require('querystring');
const Url = require('url');

module.exports = (request)=>{
	let {url,method,context} = request;
	method = method.toLowerCase();
	context.query = querystring.parse(Url.parse(url));
	return Promise.resolve({
		then:(resolve,reject)=>{
			context.method = method;
			if(method == "post"){
				let data = '';
				request.on('data',(chunk)=>{
					data += chunk;
				}).on('end',()=>{
					context.body = JSON.parse(data);
					resolve();
				})
			}else if(method == 'get'){
				resolve();
			}
		}
	})
};