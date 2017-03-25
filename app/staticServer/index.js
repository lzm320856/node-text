/*
 * Created by TAL on 2017/3/25.
 */
const path = require('path');
const fs = require('fs');
let getPath = url=>path.resolve(process.cwd(),'public',`.${url}.html`);
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
