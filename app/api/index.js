/*
**	API静态数据分发服务器
*   只处理后缀为.action的请求，通过不同情况给res.ctx赋值
*/
let Router = require('./router');
let router = new Router();
//获取分类列表
router.get('/categoryList.action',ctx=>{
	return {"a":1}
});
//增加分类
router.get('/category.action',ctx=>{});
//增加博客
router.get('/blog.action',ctx=>{});




let apiServer = (ctx)=>{
	let { reqCtx,resCtx } = ctx;
	let { pathname,method } = reqCtx;
	return Promise.resolve({
		then:(resolve,reject)=>{
			if(pathname.match('.action')){
				return router.routes(ctx).then(val=>{
					resCtx.body = JSON.stringify(val);
					resCtx.headers = Object.assign(resCtx.headers,{
						"Content-Type":"application/json"
					});
					resolve();
				})
			}else {
				resolve();
			}
		}
	})

};

module.exports = apiServer;