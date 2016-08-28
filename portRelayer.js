var hmp = require('./hostsMapToPorts.js')
var http = require('http')   
/*   | ---- event 'request' <----- bind ----------------------------------------------|  */       
var server = http.createServer((req/*http.IncomingMessage*/,resp/*http.SeverResponse*/)=>{
    var options = {                /*impl Readable Stream*/  /*impl Writable Stream*/
        hostname:req.headers.host,
        port:hmp[req.headers.host],
        method:req.method,
        path:req.url,
        headers:req.headers
    },
    _req 

    resp.on('close',() => {
        _req && _req.abort()
    })
 
    /*   | ---- event 'response' <----- bind ------------------------------------------|  */                                                
    _req/*http.ClientRequest*/ = http.request(options,_resp/*http.IncomingMessage*/=>{
            /*impl Writable Stream*/
        resp.writeHead(_resp.statusCode,_resp.headers)
        _resp.on('data',chunk=>{
            resp.write(chunk)
        })
        _resp.on('end',()=>{
            resp.end()
        })
    })
    _req.on('error',e=>{
        
        //关闭请求

        _req.abort()

        resp.statusCode = 500
        resp.end()
        //console.log(e)
    })

    _req.on('close',()=>{
    
        resp.end()
        //console.log('Closed!')
    })

    //POST请求，先获取请求数据，然后发送
    if(options.method==='POST'){
        //options已经写了headers,所以无需再设置headers
        req.on('data',chunk=>{
            _req.write(chunk)
        })

        req.on('end',()=>{
            //请求数据读取完成，转发请求
            _req.end()
        })
    }
    //GET或其他请求，直接发送
    else if(options.method==='GET')
        _req.end()
    else{

        _req.abort()
        resp.end()
    }

})

server.listen(80)
