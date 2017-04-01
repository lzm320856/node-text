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
		return (request,response)=>{
			let _Headers = {'x-powered-by':'node.js'};
			request.context = {
				body:'',
				query:{},
			};
			urlParser(request).then(()=>{
				return apiServer(request);
			}).then(data=>{
				if(!data){
					return staticServer(request);
				}else{
					return data;
				}
			}).then(data =>{
				let body = "";
				if(data instanceof Buffer){
					body = data;
				}else {
					_Headers = Object.assign(_Headers,{
						"Content-Type":"application/json"
					});
					body = JSON.stringify(data);
				}
				correctResponse(response,body,_Headers)
			})
		}
	}
}
module.exports = new App();
