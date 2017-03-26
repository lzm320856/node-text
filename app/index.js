/**主要核心入口..*/
const fs = require('fs');
const path = require('path');
const staticServer = require('./staticServer');
const apiServer = require('./api');

class App{
	constructor(){

	}
	initServer(){
		let _Headers = {'x-powered-by':'node.js'};
		let correctResponse = (res,data,header) =>{
			res.writeHead(200,'ok',header);
			res.end(data);
		};
		return (request,response)=>{
			let {url} = request;   //  解构赋值 => let url = request.url
			if(url.match('.action')){
				apiServer(url).then(data=>{
					let _newHead = Object.assign({'Content-Type':'application/json'},_Headers);
					correctResponse(response,JSON.stringify(data),_newHead);
				});
			}else{
				staticServer(url).then(data=>{
					correctResponse(response,data,_Headers);
				});
			}
		}
	}
}
module.exports = new App();
