/*
 * 静态资源服务器处理
 */
const path = require('path');
const fs = require('fs');

let getPath = url=>{
	if(!/\./.test(url)){url = `${url}.html`;}
	return path.resolve(process.cwd(),'public',`.${url}`);
};
let staticFunc = (ctx)=>{
	let {req,resCtx} = ctx;
	let {url} = req;
	return Promise.resolve({
		then:(resolve,reject)=> {
			if (!url.match('.action')) {
				if (url == '/') url = '/index';
				let _path = getPath(url);
				fs.readFile(_path, (err, data) => {
					err ? resCtx.body = `not found${err}` : resCtx.body = data;
					resolve();
				})
			} else {
				resolve();
			}
		}
	});
};

module.exports = staticFunc;
