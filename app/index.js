/**主程序核心入口..*/
const staticServer = require('./staticServer');
const apiServer = require('./api');
const urlParser = require('./urlParser');

class App{
	constructor(){

	}
	initServer(){
		let correctResponse = (res,data,header) =>{
			res.writeHead(200,'ok',header);
			res.end(data);
		};
		let _Headers = {'x-powered-by':'node.js'};
		let ctx = {
			req:request,
			reqCtx:{
				body:'',         //post的请求数据
				query:{},        //处理客户端的get请求
			},
			res:response,
			resCtx:{
				headers:{},
				body:''
			}
		};
		
		return (request,response)=>{
			urlParser(ctx).then(()=>{
				return apiServer(ctx);
			}).then(()=>{
				return staticServer(ctx);
			}).then(() =>{
				correctResponse(response,ctx.resCtx.body,_Headers);
			})
		}
	}
}
module.exports = new App();
