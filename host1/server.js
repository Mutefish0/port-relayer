var port = 8000

var http = require('http')
var server = http.createServer((req,resp)=>{
    resp.end('Hello Host1')
})

server.listen(port)