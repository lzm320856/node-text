const http = require("http");
const app = require("./app");
const _PORT = 3333;

//中间键
const staticServer = require('./app/staticServer');
const apiServer = require('./app/api');
const urlParser = require('./app/urlParser');
app.use(urlParser);
app.use(apiServer);
app.use(staticServer);

// 服务器入口
http.createServer(app.initServer()).listen(_PORT,()=>{
	console.log(`server listening on port ${_PORT}`)
});
