/**
 * Cookie处理
 */
const cookie_parser = require('cookie');
const whiteNameList = ['/linzm'];        //白名单

let cookieParser = (ctx)=>{
	let { resCtx,req } = ctx;
	let { url,headers } = req;
	let { cookie } = headers;
	let cookieObj = cookie_parser.parse(cookie);
	let authCookieSet = (time) =>{
		resCtx.headers = Object.assign(resCtx.headers,{
			"Set-Cookie":`auth=true;Max-Age=${time}`
		})
	};

	return Promise.resolve({
		then:(resolve,reject)=>{
			if(cookieObj['auth']) {
				resCtx.authority = true;
				authCookieSet(3600);
			}
			if(whiteNameList.indexOf(url) != -1){
				authCookieSet(3600);
			}
			if(url == '/logout'){
				authCookieSet(0);
			}
			resolve();
		}
	})
};

module.exports = cookieParser;