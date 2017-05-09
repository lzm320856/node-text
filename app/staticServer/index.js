/*
 * 静态资源服务器处理
 */
const path = require('path');
const fs = require('fs');
const mime = require('mime');

let getPath = url=>{
	if(!/\./.test(url)){url = `${url}.html`;}
	return path.resolve(process.cwd(),'public',`.${url}`);
};
let staticServer = (ctx)=>{
	let {req,resCtx,reqCtx} = ctx;
	let {pathname} = reqCtx;

	return Promise.resolve({
		then:(resolve,reject)=> {
			if (pathname.match(/\./) && !pathname.match('.action')) {
				let _path = getPath(pathname);
				fs.readFile(_path, (err, data) => {
					resCtx.headers = Object.assign(resCtx.headers,{
						"Content-Type":mime.lookup(_path)
					});
					err ? resCtx.body = `not found${err}` : resCtx.body = data;
					resolve();
				})
			} else {
				resolve();
			}
		}
	});
};

module.exports = staticServer;
