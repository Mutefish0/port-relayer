var port = 8001

var http = require('http')
var server = http.createServer((req,resp)=>{
    resp.end('Hello Host2')
})

server.listen(port)