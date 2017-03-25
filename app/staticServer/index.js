/*
 * Created by TAL on 2017/3/25.
 */
const path = require('path');
const fs = require('fs');
let getPath = url=>{
	if(!/\./.test(url)){url = `${url}.html`;}
	return path.resolve(process.cwd(),'public',`.${url}`);
}
let staticFunc = (url)=>{
	if(url=='/'){
		url = '/index';
	}
	let _path=getPath(url);
	let body= '';
	try{
		body = fs.readFileSync(_path)
	}catch(error){
		body =`NOT FOUND`
	}
	return body;
};

module.exports = staticFunc
