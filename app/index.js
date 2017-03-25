/**
 * Created by TAL on 2017/3/20.
 */
/**主要核心入口..*/
const fs = require("fs");
const path = require('path');
const staticServer = require('./staticServer')

class App{
	constructor(){

	}
	initServer(){
		return (request,response)=>{
			let {url} = request;   //  解构赋值 => let url = request.url
			let data = staticServer(url);
			response.writeHead(200,'ok');
			response.end(data);
		}
	}
}
module.exports = new App();
