/**
 * Cookie处理
 */
const cookie_parser = require('cookie');
const whiteNameList = ['/linzm'];        //白名单

let cookieParser = (ctx)=>{
	let { resCtx,req,reqCtx } = ctx;
	let { headers } = req;
	let { pathname } = reqCtx;
	let { cookie } = headers;
	let cookieObj = cookie_parser.parse(cookie);   //将cookie转为对象
	let authCookieSet = (time) =>{
		resCtx.headers = Object.assign(resCtx.headers,{
			"Set-Cookie":`auth=true;Max-Age=${time}`
		})
	};
	return Promise.resolve({
		then:(resolve,reject)=>{
			if(cookieObj['auth']) {
				//如果有这个cookie那么，给它续命
				resCtx.authority = true;
				authCookieSet(3600);
			}
			if(whiteNameList.indexOf(pathname) != -1){
				authCookieSet(3600);
			}
			if(pathname == '/logout'){
				authCookieSet(0);
			}
			resolve();
		}
	})
};

module.exports = cookieParser;