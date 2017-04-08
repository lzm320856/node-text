/**
 * Created by linzm on 2017/4/7.
 * 动态资源获取
 */

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const mime = require('mime');

module.exports = (ctx)=>{
	let { req,resCtx } = ctx;
	let { url } = req;
	return Promise.resolve({
		then:(resolve,reject)=>{
			let urlMap = {
				'/':{
					viewName:'index.html'
				},
				'/about':{
					viewName:'about.html'
				},
				'/list':{
					viewName:'list.html'
				}
			};
			let viewPath = path.resolve(process.cwd(),'public');
			if(urlMap[url]){
				let { viewName } = urlMap[url];
				let htmlPath = path.resolve(viewPath,viewName);
				let render = ejs.compile(fs.readFileSync(htmlPath,"utf-8"),{
					compileDebug:true
				});
				resCtx.body = render({hello:"<script>alert(1)</script>"});
			}
			resolve();
		}
	})
};