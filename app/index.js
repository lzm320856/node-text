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
		let correctResponse = (res,data,header) =>{
			res.writeHead(200,'ok',header);
			res.end(data);
		};
		let _Headers = {'x-powered-by':'node.js'};

		return (request,response)=>{
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
			this.composeMiddleware(ctx).then(() =>{
				let {body} = ctx.resCtx;
				correctResponse(response,body,_Headers);
			})
		}
	}
}
module.exports = new App();
