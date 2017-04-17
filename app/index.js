/**主程序核心入口..*/

class App{
	constructor(){
		this.middlewareArr = [];
		this.middlewareChain = Promise.resolve();
	}
	use(middleware){
		this.middlewareArr.push(middleware);
	}
	composeMiddleware(context){
		for(let middleware of this.middlewareArr){
			this.middlewareChain = this.middlewareChain.then(()=>{
				return middleware(context);
			});
		}
		return this.middlewareChain;
	}
	initServer(){
		let correctResponse = (ctx) =>{
			let { res,resCtx} = ctx;
			let { body,headers,statusCode,statusMessage} = resCtx;
			res.writeHead(statusCode,statusMessage,headers);
			res.end(body);
		};

		return (request,response)=>{
			let ctx = {
				req:request,
				reqCtx:{
					body:'',         //post的请求数据
					query:{},        //处理客户端的get请求
				},
				res:response,
				resCtx:{
					authority:false,
					statusCode:200,
					statusMessage:"ok",
					headers:{
						'x-powered-by':'node.js'
					},
					body:''
				}
			};
			this.composeMiddleware(ctx).then(() =>{
				correctResponse(ctx);
			})
		}
	}
}
module.exports = new App();
