var port = 8000

var http = require('http')
var server = http.createServer((req,resp)=>{
    if(req.method==='GET') 
        resp.end(`GET ${req.url}`)
    else if(req.method==='POST'){
        var body = []
        req.on('data',chunk=>body.push(chunk))
        req.on('end',()=>resp.end(Buffer.concat(body),'utf8'))
    }
    else
        resp.end("SORRY.")
})

server.listen(port)