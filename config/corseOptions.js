const whitelist=['https://www.yoursite.com','http://127.0.0.1:5500','http://localhost:4500'];
const corsOptions={
    origin :(origin,callback)=>{
        if(whitelist.indexOf(origin)!== -1 || !origin){
            callback(null,true)
        }
        else{
            callback(new Error('Not allowed by cors'))
        }
    },
    optiionsSuccessStatus: 200 
}
module.exports=corsOptions;