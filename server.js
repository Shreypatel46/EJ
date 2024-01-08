const http= require('http');
const fs = require('fs');
const fsPromises= require('fs').promises;
const path= require('path');

const logEvents= require('./middleware/logevent');
const EventEmitter = require('events');
class Emitter extends EventEmitter{};
//initialize object
const myEmitter=new Emitter();
myEmitter.on('log',(ms,fileName)=>logEvents(ms,fileName));
const PORT = process.env.PORT || 3500;

const serverFile =async (filePath,contentType,response) =>{
    try{
        const data=await fsPromises.readFile(filePath,'utf-8');
        response.writeHead(200,{'Content-Type':contentType});
        response.end(data);
    }
    catch(err){
        console.log(err);
        myEmitter.emit('log',`${err.name}: ${err.message}`,`errlog.txt`);
        response.statusCode =500;
        response.end();
    }
}
const server =http.createServer((req,res)=>{
    console.log(req.url,req.method);
    myEmitter.emit('log',`${req.url}\t${req.method}`,`rlog.txt`);

    const extension =path.extname(req.url);
    let contentType;

    switch(extension){
        case '.css':
            contentType='text/css';
            break;
        case '.js':
            contentType='text/javascript';
            break;
        case '.json':
            contentType='application/json';
            break;
        case '.jpg':
            contentType='image/jpeg';
            break;
        case '.txt':
            contentType='text/plain';
            break;
        case '.png':
            contentType='image/png';
            break;
        default:
            contentType='text/html';
    }
    let filePath=
        contentType=== 'text/html' && req.url==='/'
            ?path.join(__dirname,'day-2','index.html')
            : contentType=== 'text/html' && req.url.slice(-1) === '/'
                ?path.join(__dirname,'day-2',req.url,'index.html')
                :contentType=== 'text/html'
                    ?path.join(__dirname,'day-2',req.url)
                    :path.join(__dirname,req.url);
    
    if(!extension && req.url.slice(-1)!=='/') filePath+='.html';

    const fileExists= fs.existsSync(filePath);

    if(fileExists){
        serverFile(filePath,contentType,res);
    }
    else{
        switch(path.parse(filePath).base){
            case 'old-page.html':
                res.writeHead(301,{'Location': '/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301,{'Location': '/'});
                res.end();
                break;
            default:
                serverFile(path.join(__dirname,'day-2','404.html'),'text/html',res);
        }
    }
});

server.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));











// add listener for log event 
//myEmitter.on('log',(ms)=>logEvents(ms));

// setTimeout(()=>{
//     //emit event
//     myEmitter.emit('log','log event emitted');
// },2000); 