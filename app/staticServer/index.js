/*
 * 静态资源服务器处理
 */
const path = require('path');
const fs = require('fs');

let getPath = url=>{
	if(!/\./.test(url)){url = `${url}.html`;}
	return path.resolve(process.cwd(),'public',`.${url}`);
};
let staticFunc = (request)=>{
	let {url} = request;
	return new Promise((resolve,reject)=>{
		if(url=='/')  url = '/index';
		let _path=getPath(url);
		fs.readFile(_path,(err,data)=>{
			if(err) return resolve(`not found${err}`);
			return resolve(data);
		})
	});
};

module.exports = staticFunc;
