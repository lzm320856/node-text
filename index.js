const http = require("http");
const App = require("./app");

const app = new App();
const _PORT = 3333;

http.createServer(app.initServer()).listen(_PORT,()=>{
	console.log(`server listening on port ${_PORT}`)
});