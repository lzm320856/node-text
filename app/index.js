/**
 * Created by TAL on 2017/3/20.
 */
/**主要核心入口..*/
const fs = require("fs");

class App{
	constructor(){

	}
	initServer(){

		return (request,response)=>{
			fs.readFile('./public/index.html','utf-8',(error,data)=>{
				response.end(data);
			})
		}
	}
}
module.exports = App;
