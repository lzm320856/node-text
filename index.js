const http = require("http");
const app = require("./app");
const _PORT = 3333;

//中间键
const cookieParser = require('./app/cookieParser');
const staticServer = require('./app/staticServer');
const apiServer = require('./app/api');
const urlParser = require('./app/urlParser');
const viewServer = require('./app/viewServer');

app.use(cookieParser);
app.use(urlParser);
app.use(apiServer);
app.use(staticServer);
app.use(viewServer);

//引入mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/blog');
mongoose.connection.on('error', ()=>{console.log(`some error happend`)})
	     .once('open', ()=> {console.log('db connected')
	     });

// 服务器入口
http.createServer(app.initServer()).listen(_PORT,()=>{
	console.log(`server listening on port ${_PORT}`)
});
