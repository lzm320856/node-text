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
	let {req,resCtx} = ctx;
	let {url} = req;
	return Promise.resolve({
		then:(resolve,reject)=> {
			if (url.match(/\./) && !url.match('.action')) {
				let _path = getPath(url);
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
