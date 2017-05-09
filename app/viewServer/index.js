/**
 * Created by linzm on 2017/4/7.
 * 动态资源获取
 */

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const mime = require('mime');
const urlrewriteMap = require('./urlrewrite');

module.exports = (ctx)=>{
	let { req,resCtx,reqCtx } = ctx;
	let { pathname } = reqCtx;
	return Promise.resolve({
		then: (resolve, reject) => {
			if(pathname.match('action') || pathname.match(/\./)){
				resolve();
			}else {
				let viewPath = path.resolve(__dirname, 'ejs');
				let ejsName = urlrewriteMap[pathname];
				if (ejsName) {
					let layoutPath = path.resolve(viewPath, 'layout.ejs');
					let layoutHtml = fs.readFileSync(layoutPath, "utf-8");
					let render = ejs.compile(layoutHtml,{
						compileDebug:true,
						filename:layoutPath,
					});
					let html = render({
						templateName:ejsName,
						authority:resCtx.authority
					});
					resCtx.body = html;
					resCtx.headers = Object.assign(resCtx.headers, {
						"content-type": "text/html"
					});
				}else {
					resCtx.headers = Object.assign(resCtx.headers,{
						"Location":'/'
					});
					resCtx.statusMessage = "Redirect";
					resCtx.statusCode = 302;
					resCtx.body = '';
				}
				resolve();
			}
		}
	})
}